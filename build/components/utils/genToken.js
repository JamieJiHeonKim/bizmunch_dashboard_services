"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const generateToken = () => {
    const tokenLength = 8;
    let token = '';
    const characters = '0123456789';
    for (let i = 0; i < tokenLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=genToken.js.map