const jwt = require('jsonwebtoken');

exports.generateToken = (payload, secretSignature, tokenLife) => {
    try {
        return tokenLife ? jwt.sign(
            payload,
            secretSignature,
            {
                algorithm: 'HS256',
                expiresIn: tokenLife,
            }
        ) : jwt.sign(
            payload,
            secretSignature
        );
    } catch (error) {
        console.log(`Error in generate access token:  + ${error}`);
        return null;
    }
};

exports.decodeToken = (token, secretKey) => {
    try {
        //ignoreExpiration: true mục đích để dù cho access token đó đã hết hạn nhưng vẫn cho verify
        return jwt.verify(token, secretKey, {
            ignoreExpiration: true,
        });
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};
exports.verifyToken = (token, secretKey) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.log(`Error in verify access token:  + ${error}`);
        return null;
    }
};