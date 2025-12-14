module.exports = {
  PORT: process.env.PORT || 5001,   // ref: https://www.w3schools.com/nodejs/nodejs_env_variables.asp
  JWT_SECRET: process.env.JWT_SECRET,
  // This should always be stored in .env (never hard-coded) ref: https://stackoverflow.com/questions/31309759/what-is-the-purpose-of-jwt-secret
  MONGO_URI: process.env.MONGO_URI, // Loaded from environment variables for security reasons ref: https://stackoverflow.com/questions/42415103/how-to-hide-mongodb-credentials-in-node-js
};
  