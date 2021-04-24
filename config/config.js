exports.creds = {
  identityMetadata:
    "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",

  clientID: "2faf4827-2f8e-4c8d-9740-325e0cc09918", // This ClientID comes from Azure

  clientSecret: "1ut__0r.Bx-8Q1CPgNktIo9KUBw.nZRJoU", // This ClientSecret comes from Azure

  responseType: "code id_token",

  responseMode: "form_post",

  redirectUrl: "https://todo-mvc-auth.arnaldopires.repl.co/auth/openid/return",

  allowHttpForRedirectUrl: true,

  validateIssuer: false,

  issuer: null,

  passReqToCallback: false,

  useCookieInsteadOfSession: false,

  cookieEncryptionKeys: [
    { key: "12345678901234567890123456789012", iv: "123456789012" },
    { key: "abcdefghijklmnopqrstuvwxyzabcdef", iv: "abcdefghijkl" },
  ],

  scope: ["profile", "offline_access", "https://graph.microsoft.com/mail.read"],

  loggingLevel: false,

  nonceLifetime: null,

  nonceMaxAmount: 5,

  clockSkew: null,
};

exports.destroySessionUrl = "https://todo-mvc-auth.arnaldopires.repl.co"; // This sessionurl comes from Repl

exports.useMongoDBSessionStore = false;

exports.databaseUri = "mongodb://localhost/OIDCStrategy";

exports.mongoDBSessionMaxAge = 24 * 60 * 60;
