#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { NetworkStack } from '../lib/network-stack';
import { StorageStack } from '../lib/storage-stack';
import { DatabaseStack } from '../lib/database-stack';
import { ApiStack } from '../lib/api-stack';

const app = new App();
const network = new NetworkStack(app, 'NetworkStack');
const _storage = new StorageStack(app, 'StorageStack', { vpc: network.vpc });
const db = new DatabaseStack(app, 'DatabaseStack', { vpc: network.vpc });
new ApiStack(app, 'ApiStack', { vpc: network.vpc, dbCluster: db.cluster });
