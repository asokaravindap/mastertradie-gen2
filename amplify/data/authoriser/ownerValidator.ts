/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AppSyncAuthorizerEvent } from 'aws-lambda';
import { parse } from 'graphql';

export function validateOwner(event: AppSyncAuthorizerEvent, tokenSub: string): boolean {

    const astOperationType = (ast: any) => ast.definitions[0];
    const astOperationName = (operationDefinition: any) =>  operationDefinition.selectionSet.selections[0].name.value;

    const queryString = parse(event.requestContext.queryString);

    const operationType = astOperationType(queryString).operation;
    const operationName = astOperationName(astOperationType(queryString));

    if(operationName === 'listCustomers' && event.requestContext.variables.filter["tpUserAccountId"]["eq"] === tokenSub){
        return true;
    } else if(operationName === 'createCustomer' && event.requestContext.variables["input"]["tpUserAccountId"] === tokenSub){
        return true;
    } else if(operationName === 'listTags' && event.requestContext.variables.filter["tpUserAccountId"]["eq"] === tokenSub){
        return true;
    } else if(operationName === 'createTag' && event.requestContext.variables["input"]["tpUserAccountId"] === tokenSub){
        return true;
    } else if(operationName === 'listReminders' && event.requestContext.variables.filter["tpUserAccountId"]["eq"] === tokenSub){
        return true;
    } else if(operationName === 'createReminder' && event.requestContext.variables["input"]["tpUserAccountId"] === tokenSub){
        return true;
    } else {
        console.log(operationName + " " + operationType + " is not authorised");
        return false;
    }
}
