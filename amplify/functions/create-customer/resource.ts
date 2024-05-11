import { defineFunction } from '@aws-amplify/backend';

export const createCustomer = defineFunction({
  name: 'create-customer',
  entry: './handler.ts'
});