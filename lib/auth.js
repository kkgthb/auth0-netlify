const { NetlifyJwtVerifier, removeNamespaces, claimToArray } = require('@serverless-jwt/netlify');

const verifyJwt = NetlifyJwtVerifier({
  issuer: process.env.AUTH0_JWT_ISSUER,
  audience: process.env.AUTH0_JWT_AUDIENCE,
  mapClaims: (claims) => {
    const user = claims;
    user.scope = claimToArray(user.scope);
    return user;
  }
});

/**
 * Require the request to be authenticated.
 */
module.exports.requireAuth = verifyJwt;

module.exports.requireScope = (scope, handler) =>
  verifyJwt(async (event, context, cb) => {
    const { claims } = context.identityContext;

    // Require the token to contain a specific scope.
    if (!claims || !claims.scope || claims.scope.indexOf(scope) === -1) {
      return json(403, {
        error: 'access_denied',
        error_description: `Token does not contain the required '${scope}' scope`
      });
    }

    // Continue.
    return handler(event, context, cb);
  });