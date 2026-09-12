// {
//     "web" = { 
//               "client_id" : "556275386193-5ekrhlule5usso7rb1ievbnr4l81dal8.apps.googleusercontent.com",
//               "project_id" : "emaily-507706","auth_uri":"https://accounts.google.com/o/oauth2/auth",
//               "token_uri" : "https://oauth2.googleapis.com/token",
//               "auth_provider_x509_cert_url" : "https://www.googleapis.com/oauth2/v1/certs",
//               "client_secret" : "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",
//               "redirect_uris" : ["http://localhost:8000/auth/google/callback"],
//               "javascript_origins" : ["http://localhost:8000"]
//             }
//   };

if (process.env.NODE_ENV === 'production') {
  // We are in production - return the prod set of keys
  module.exports = require('./prod');
} else {
  // We are in development - return the dev keys!
  module.exports = require('./dev');
}