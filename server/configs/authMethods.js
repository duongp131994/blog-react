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