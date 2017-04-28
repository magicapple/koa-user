/**
 * Created by jin on 4/28/17.
 */


/**
 * resolveAuthorizationHeader - Attempts to parse the token from the Authorization header
 *
 * This function checks the Authorization header for a `Bearer <token>` pattern and return the token section
 *
 * @param {Object}        ctx  The ctx object passed to the middleware
 * @param {Object}        opts The middleware's options
 * @return {String|null}  The resolved token or null if not found
 */
module.exports = function resolveAuthorizationHeader(ctx, opts) {
    if (!ctx.header || !ctx.header.authorization) {
        return false;
    }

    const parts = ctx.header.authorization.split(' ');

    if (parts.length === 2) {
        const scheme = parts[0];
        const credentials = parts[1];

        if (/^Bearer$/i.test(scheme)) {
            return credentials;
        }
    }
    return false;
};