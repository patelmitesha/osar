
var mongoose = require('mongoose');
var request= require('request');

module.exports.paymentrequest = function(req, res) {
console.log("Inside payment gateway");
    var headers = { 'X-Api-Key': 'test_91056a9825f850df083e3cb27a4', 
                    'X-Auth-Token': 'test_551db69ec06ff4ef831bca98dcc'}
    var payload = {
      purpose: 'Recruitment',
      amount: '10',
      phone: '8905017617',
      buyer_name: 'Mitesh Patel',
      redirect_url: 'https://blue-walrus-52.localtunnel.me/redirect/',
      send_email: false,
      webhook: 'https://blue-walrus-52.localtunnel.me/webhook/',
      send_sms: false,
      email: 'patelmitesha@gmail.com',
      allow_repeated_payments: false}
    
    request.post('https://test.instamojo.com/api/1.1/payment-requests/', {form: payload,  headers: headers}, function(error, response, body){
      if(!error && response.statusCode == 201){
        console.log(body);
      }

      console.log(error);
      console.log(response);
      if(error){
        res.status(500).json(error);
      }else{
        res.status(200).json(response);
      }
    });
};

