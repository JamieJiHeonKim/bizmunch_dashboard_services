import { LINE_KID } from '../../middleware/env';
import { privateKey } from './../../constants/private.key';
let jose = require('node-jose');


export const LineJwt =async () => {

let header = {
    alg: "RS256",
    typ: "JWT",
    kid: LINE_KID
};

let payload = {
    iss: "1657747186",
    sub: "1657747186",
    aud: "https://api.line.me/",
    exp: Math.floor(new Date().getTime() / 1000) + 60 * 30,
    token_exp: 60 * 60 * 24 * 30
};


let lineJwt = await jose.JWS.createSign({format: 'compact', fields: header}, privateKey)
    .update(JSON.stringify(payload))
    .final()

return lineJwt;
}