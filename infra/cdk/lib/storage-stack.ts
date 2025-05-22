import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Key } from 'aws-cdk-lib/aws-kms';
import {
  Bucket,
  BucketEncryption,
  BlockPublicAccess,
} from 'aws-cdk-lib/aws-s3';
import {
  Rule,
  EventPattern,
} from 'aws-cdk-lib/aws-events';
import { SnsTopic } from 'aws-cdk-lib/aws-events-targets';
import * as sns from 'aws-cdk-lib/aws-sns';
import { IVpc } from 'aws-cdk-lib/aws-ec2';

export interface StorageStackProps extends StackProps {
  vpc: IVpc;
}

export class StorageStack extends Stack {
  constructor(scope: Construct, id: string, props: StorageStackProps) {
    super(scope, id, props);

    // 🔐 KMS key for S3 encryption
    const key = new Key(this, 'PapertrailDocsKey', {
      enableKeyRotation: true,
    });

    // 📁 Raw documents S3 bucket
    const rawDocsBucket = new Bucket(this, 'RawDocsBucket', {
      bucketName: `papertrail-raw-docs-${this.account}-${this.region}`,
      encryption: BucketEncryption.KMS,
      encryptionKey: key,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.RETAIN,
      versioned: true,
    });

    // 🖼️ Thumbnails S3 bucket
    new Bucket(this, 'ThumbDocsBucket', {
      bucketName: `papertrail-thumb-docs-${this.account}-${this.region}`,
      encryption: BucketEncryption.KMS,
      encryptionKey: key,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.RETAIN,
      versioned: true,
    });

    // 📣 SNS topic for future S3 triggers
    const snsTopic = new sns.Topic(this, 'S3EventTopic');

    // 🔔 EventBridge rule to react to new uploads
    new Rule(this, 'S3ObjectCreatedRule', {
      eventPattern: {
        source: ['aws.s3'],
        detailType: ['Object Created'],
        detail: {
          bucket: {
            name: [rawDocsBucket.bucketName],
          },
        },
      } as unknown as EventPattern,
      targets: [new SnsTopic(snsTopic)],
    });
  }
}
