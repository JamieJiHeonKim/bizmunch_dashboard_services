"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPool = void 0;
const { CognitoUserPool } = require('amazon-cognito-identity-js');
// Get the user pool ID, client ID, and region from the environment variables
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;
const region = process.env.REGION;
// Create a Cognito user pool object
exports.userPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId,
    region: region,
});
//# sourceMappingURL=cognito.js.map