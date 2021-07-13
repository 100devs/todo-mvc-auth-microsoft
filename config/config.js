exports.creds = {
  identityMetadata: 'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration', 

  clientID: process.env.CLIENT_ID, 

  clientSecret: process.env.CLIENT_SECRET, 

  responseType: 'code id_token', 

  responseMode: 'form_post', 

  redirectUrl: (process.env.BASE_URL + '/auth/openid/return'), 

  allowHttpForRedirectUrl: true,

  validateIssuer: false,

  issuer: null,

  passReqToCallback: false,

  useCookieInsteadOfSession: false,

  cookieEncryptionKeys: [ 
    { 'key': '12345678901234567890123456789012', 'iv': '123456789012' },
    { 'key': 'abcdefghijklmnopqrstuvwxyzabcdef', 'iv': 'abcdefghijkl' }
  ],

  scope: ['profile', 'offline_access', 'https://graph.microsoft.com/mail.read'],

  loggingLevel: false,

  nonceLifetime: null,

  nonceMaxAmount: 5,

  clockSkew: null,
};

exports.destroySessionUrl = process.env.BASE_URL;

exports.useMongoDBSessionStore = false;

exports.databaseUri = 'mongodb://localhost/OIDCStrategy';

exports.mongoDBSessionMaxAge = 24 * 60 * 60;