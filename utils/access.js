const request = require('request');
function access(req, res, next) {
  let url =
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
  let auth = new Buffer.from(
    'P8R1DZ7WGmBx8nev54Rjf39ZyHKUXbgG:UQJaMfgHACf5her2'
  ).toString('base64');
  request(
    {
      url,
      headers: {
        Authorization: 'Basic ' + auth,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        req.access_token = JSON.parse(body).access_token;
        next();
      }
    }
  );
}

module.exports = access;
