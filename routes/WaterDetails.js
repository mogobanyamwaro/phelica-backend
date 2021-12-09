const router = require('express').Router();
const request = require('request');

const timestamp = require('../utils/timeStamps');
const access = require('../utils/access');

const WaterFromIoT = require('../models/Water');
const Mpesa = require('../models/mpesa');

router.post('/', access, async (req, res) => {
  const newWater = new WaterFromIoT(req.body);

  let endpoint =
    'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
  let auth = 'Bearer ' + req.access_token;
  console.log(req.body);
  const phoneNumber = await req.body.mpesaMessage;
  const amount = await req.body.amount;

  const password = new Buffer.from(
    '174379' +
      'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919' +
      timestamp()
  ).toString('base64');

  try {
    // await Mpesa.deleteMany({});
    console.log('success deleted the codes');
    const savedWater = await newWater.save();

    request(
      {
        url: endpoint,
        method: 'POST',
        headers: {
          Authorization: auth,
        },
        json: {
          BusinessShortCode: '174379',
          Password: password,
          Timestamp: timestamp(),
          TransactionType: 'CustomerPayBillOnline',
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: '174379',
          PhoneNumber: phoneNumber,
          PassKey:
            'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919',
          CallBackURL:
            'https://0dc0-102-167-222-106.ngrok.io/api/water/callback',
          AccountReference: 'Test',
          TransactionDesc: 'Test',
        },
      },
      function (error, response, body) {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json(body);
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.post('/callback', async (req, res) => {
  console.log('----stk-----');
  const resultCode = await new Mpesa({
    resultcode: req.body.Body.stkCallback.ResultCode,
  });
  const result = await resultCode.save();
  console.log(result);
});

router.get('/resultcode', async (req, res) => {
  try {
    const resultcode = await Mpesa.find({});
    res.status(200).json(resultcode);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get('/', async (req, res) => {
  try {
    const alldetails = await WaterFromIoT.find({});
    res.status(200).json(alldetails);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
