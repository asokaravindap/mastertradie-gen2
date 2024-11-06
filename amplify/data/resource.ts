import { type ClientSchema, a, defineData, defineFunction } from "@aws-amplify/backend";

const schema = a.schema({
  TPUserAccount: a
    .model({
      firstName: a.string(),
      lastName: a.string(),
      email: a.string(),
      subscription: a.string(),
      customers: a.hasMany('Customer', 'tpUserAccountId'),
      tags: a.hasMany('Tag', 'tpUserAccountId'),
      emails: a.hasMany('Email', 'tpUserAccountId'),
      reminders: a.hasMany('Reminder', 'tpUserAccountId')
    })
    .authorization(allow => [
      allow.custom()
    ]),

  Customer: a
    .model({
      firstName: a.string(),
      lastName: a.string(),
      email: a.string(),
      phone: a.string(),
      tier: a.string(),
      tpUserAccountId: a.id(),
      tpUserAccount: a.belongsTo('TPUserAccount', 'tpUserAccountId'),
      reminders: a.hasMany('Reminder', 'customerId'),
      customerTags: a.hasMany('CustomerTag', 'customerId')
    })
    .authorization(allow => [
      allow.custom()
    ]),

  Tag: a
    .model({
      name: a.string(),
      description: a.string(),
      tpUserAccountId: a.id(),
      tpUserAccount: a.belongsTo('TPUserAccount', 'tpUserAccountId'),
      customerTags: a.hasMany('CustomerTag', 'tagId')
    })
    .authorization(allow => [
      allow.custom()
    ]),

  CustomerTag: a
    .model({
      customerId: a.id(),
      tagId: a.id(),
      customer: a.belongsTo('Customer', 'customerId'),
      tag: a.belongsTo('Tag', 'tagId'),
    })
    .authorization(allow => [
      allow.custom()
    ]),

  Reminder: a
    .model({
      timestamp: a.datetime(),
      description: a.string(),
      sendEmail: a.boolean(),
      customerId: a.id(),
      customer: a.belongsTo('Customer', 'customerId'),
      tpUserAccountId: a.id(), // Explicitly adding the field to filter reminders by tpUserAccountId
      tpUserAccount: a.belongsTo('TPUserAccount', 'tpUserAccountId')
    })
    .authorization(allow => [
      allow.custom()
    ]),

    Email: a
    .model({
      subject: a.string(),
      content: a.string(),
      attachment: a.string(),
      tpUserAccountId: a.id(),
      tpUserAccount: a.belongsTo('TPUserAccount', 'tpUserAccountId'),
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
