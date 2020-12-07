const { NetlifyJwtVerifier } = require('@serverless-jwt/netlify');

const verifyJwt = NetlifyJwtVerifier({
  issuer: process.env.AUTH0_JWT_ISSUER,
  audience: process.env.AUTH0_JWT_AUDIENCE,
});

exports.handler = verifyJwt(async (event, context) => {
  const { claims } = context.identityContext;
  return {
    statusCode: 200,
    body: `Hi there ${claims.email}!`
  };
});