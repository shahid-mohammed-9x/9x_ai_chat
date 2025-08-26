const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_TIME,
} = require("../config/index.config");

/**
 * The function `createAccessToken` generates an access token for a user with a specified user ID and
 * role.
 * @param {String} userId  - The `userId` parameter is the unique identifier of the user for whom the access
 * token is being created.
 * @param {String} role - The `role` parameter typically represents the role or permission level of the user. It
 * could be a string indicating whether the user is an admin, a regular user, a moderator, etc.
 * @returns The `createAccessToken` function returns a Promise that resolves with the access token
 * generated using the `jwt.sign` method.
 */
const createAccessToken = async (userId, role) => {
  if (!userId) return Promise.reject(new Error("User  ID is required"));
  let payload = {
    id: userId,
    role,
  };

  const config = { expiresIn: ACCESS_TOKEN_KEY_TIME };
  const Token = jwt.sign(payload, ACCESS_TOKEN_KEY, config);

  return Promise.resolve(Token);
};

/**
 * The function `verifyAccessToken` asynchronously verifies a token using a secret key and returns a
 * promise with the verification result.
 * @param {String} token - The `token` parameter is the access token that needs to be verified. It is passed to
 * the `verifyAccessToken` function to check its validity using the `jwt.verify` method.
 * @returns {Object} The `verifyAccessToken` function is returning a Promise that resolves to an object. If the
 * token verification is successful, it returns an object with `success: true` and spreads the `data`
 * object obtained from decoding the token. If there is an error during verification, it returns an
 * object with `success: false` and includes the `error` that occurred.
 */
const verifyAccessToken = async (token) => {
  try {
    let data = jwt.verify(token, ACCESS_TOKEN_KEY);
    return Promise.resolve({ success: true, ...data });
  } catch (error) {
    return Promise.resolve({ success: false, error });
  }
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
};
