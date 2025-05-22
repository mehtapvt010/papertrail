import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export interface DatabaseStackProps extends StackProps {
  vpc: ec2.IVpc;
}

export class DatabaseStack extends Stack {
  public readonly cluster: rds.DatabaseCluster;

  constructor(scope: Construct, id: string, props: DatabaseStackProps) {
    super(scope, id, props);

    const { vpc } = props;

    // Credentials for master user, auto-generated and stored in Secrets Manager
    const credentials = rds.Credentials.fromGeneratedSecret('papertrail_admin');

    // Security group for the DB
    const dbSecurityGroup = new ec2.SecurityGroup(this, 'PapertrailDBSG', {
      vpc,
      description: 'Allow internal access to Papertrail Aurora DB',
      allowAllOutbound: true
    });

    // Aurora PostgreSQL Serverless v2 Cluster
    this.cluster = new rds.DatabaseCluster(this, 'PapertrailAuroraCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_3
      }),
      credentials,
      defaultDatabaseName: 'papertrail',
      writer: rds.ClusterInstance.serverlessV2('writer', {
        publiclyAccessible: false,
        enablePerformanceInsights: true,
        instanceIdentifier: 'writer-instance'
      }),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
      },
      securityGroups: [dbSecurityGroup],
      enableDataApi: true, // Allows HTTP-based access using Data API
      storageType: rds.DBClusterStorageType.AURORA_IOPT1,
      monitoringInterval: Duration.seconds(60),
      backup: {
        retention: Duration.days(7),
        preferredWindow: '03:00-04:00'
      }
    });
  }
}
