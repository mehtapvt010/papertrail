import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc, SubnetType } from 'aws-cdk-lib/aws-ec2';

export class NetworkStack extends Stack {
  readonly vpc: Vpc;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.vpc = new Vpc(this, 'PapertrailVpc', {
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'public-subnet',
          subnetType: SubnetType.PUBLIC,
          cidrMask: 24
        },
        {
          name: 'private-subnet',
          subnetType: SubnetType.PRIVATE_WITH_EGRESS,
          cidrMask: 24
        }
      ]
    });
  }
}
