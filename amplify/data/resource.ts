import { type ClientSchema, a, defineData, defineFunction } from "@aws-amplify/backend";

const schema = a.schema({
  Customer: a
    .model({
      tpUserAccountId: a.string(),
      firstName: a.string(),
      lastName: a.string(),
      email: a.string(),
      phone: a.string(),
      tier: a.string()
    })
    .authorization(allow => [
      allow.custom()
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "lambda",
    lambdaAuthorizationMode: {
      function: defineFunction({
        entry: './authoriser/authoriser.ts',
      }),
      timeToLiveInSeconds: 300,
    },
  },
});
