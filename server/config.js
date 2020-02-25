const config = {};

config.oAuthClientId = process.env.GOOGLE_CLIENT_ID;
config.oAuthClientSecret = process.env.SECERET_CLIENT_ID;
config.oAuthCallbackUrl = 'http://localhost:3000/auth/google/callback';

config.port = 3000;

config.scopes = ['https://www.googleapis.com/auth/photoslibrary.readonly',
'profile',];

config.photosToLoad = 10;
config.searchPageSize = 20;
config.albumPageSize = 5;
config.apiEndpoint = 'https://photoslibrary.googleapis.com';

module.exports = config;
