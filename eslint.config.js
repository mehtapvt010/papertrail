// eslint.config.js
import js from '@eslint/js';
import ts from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    ignores: [
      'node_modules/',
      'infra/cdk/cdk.out/',
      '**/*.config.js',
      '**/*.config.cjs',
      'dist/',
      'build/',
      'coverage/',
    ],
  },
];
