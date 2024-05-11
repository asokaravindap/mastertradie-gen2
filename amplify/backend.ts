import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

import { createCustomer } from './functions/create-customer/resource';

defineBackend({
  auth,
  data,
  createCustomer
});
