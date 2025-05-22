import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as logs from 'aws-cdk-lib/aws-logs';

export interface ApiStackProps extends StackProps {
  vpc: ec2.IVpc;
  dbCluster: rds.DatabaseCluster;
}

export class ApiStack extends Stack {
  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);

    const { dbCluster } = props;

    const api = new appsync.GraphqlApi(this, 'PapertrailGraphqlApi', {
      name: 'papertrail-api',
      schema: appsync.SchemaFile.fromAsset(path.join(__dirname, '../graphql/schema.graphql')),

      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.OIDC,
          openIdConnectConfig: {
            oidcProvider: 'https://example.auth0.com/', // Replace with real Auth0/Cognito issuer
            clientId: 'papertrail-client-id',
            tokenExpiryFromIssue: 3600000,
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.IAM,
          },
        ],
      },

      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
        retention: logs.RetentionDays.ONE_WEEK,
      },

      xrayEnabled: true,
    });

    const rdsDS = api.addRdsDataSource(
      'RdsDataSource',
      dbCluster,
      dbCluster.secret!,
      'papertrail',
    );

    rdsDS.createResolver('PingResolver', {
      typeName: 'Query',
      fieldName: 'ping',
      requestMappingTemplate: appsync.MappingTemplate.fromString(`
        {
          "version": "2018-05-29",
          "statements": [
            "SELECT 'pong' AS response"
          ]
        }
      `),
      responseMappingTemplate: appsync.MappingTemplate.fromString(`
        $utils.toJson($utils.rds.toJsonObject($ctx.result)[0])
      `),
    });
  }
}
