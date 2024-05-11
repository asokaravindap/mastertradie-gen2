// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler = async (event: unknown) => {
    const response = {
        isAuthorized: true,
        resolverContext: {
          userid: 'user-id',
          info: 'contextual information A',
          more_info: 'contextual information B'
        },
        ttlOverride: 300
      };
      return response;
};