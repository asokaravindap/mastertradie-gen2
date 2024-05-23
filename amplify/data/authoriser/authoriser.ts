// This is sample code. Update this to suite your needs
import type { AppSyncAuthorizerHandler } from 'aws-lambda'; // types imported from @types/aws-lambda
import { CognitoJwtVerifier } from "aws-jwt-verify";
import { validateOwner } from './ownerValidator';

type ResolverContext = {
  userid: string;
  info: string;
  more_info: string;
};

export const handler: AppSyncAuthorizerHandler<ResolverContext> = async (
  event
) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  const token = event.authorizationToken.split(":")[1];

  console.log("Token is : " + token);

  const verifier = CognitoJwtVerifier.create({
    userPoolId: "ap-southeast-2_lqlELl8Cn", // TODO : these should be lambda env vars
    tokenUse: "access",
    clientId: "49fqju6lrcpqveidbri56eo7b0", // TODO : these should be lambda env vars
  });

  let isAuthorisationPassed = false;

  try {
    const payload = await verifier.verify(token);
    console.log("Token is valid. Payload:", payload);

    if(validateOwner(event, payload.sub)){
      console.log("owner is valid");
      isAuthorisationPassed = true;
    } else {
      console.log("owner is not valid");
      // TODO throw error
    }
    
  } catch(e) {
    console.log(e);
    console.log("Token not valid!");
    isAuthorisationPassed = false;
  }

  // need to not send this if the verification fails
  const response = {
    isAuthorized: isAuthorisationPassed,
    resolverContext: {
      userid: 'user-id',
      info: 'contextual information A',
      more_info: 'contextual information B'
    },
    ttlOverride: 0
  };
  console.log(`RESPONSE: ${JSON.stringify(response, null, 2)}`);
  return response;
};
