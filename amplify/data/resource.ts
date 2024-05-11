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
    .authorization((allow) => [
      allow.owner().to(['read']),
      allow.custom()
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
    lambdaAuthorizationMode: {
      function: defineFunction({
        entry: './custom-authoriser.ts',
      }),
      timeToLiveInSeconds: 300,
    },
  },
});
