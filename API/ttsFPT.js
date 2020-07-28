const rq = require('request');
exports.FPT_TTS = (text) =>{
  return promise = new Promise((resolve,reject)=>{
    const options = {
      url: 'https://api.fpt.ai/hmi/tts/v5', //link API tts của FPT AI
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept-Charset': 'utf-8',
          'User-Agent': 'my-reddit-client',
          'api-key': process.env.FPT_AI_KEY_API,
          'voice': process.env.FPT_AI_VOICE,
          'callback_url': process.env.CALLBACK_URL  //callback url, em dùng ngrok để tạo ra URL này, nếu a muốn test ở máy a thì cũng phải có ngrok @@
      },
      body: text //đoạn text cần chuyển đi cho FPT AI tts
  };
  rq(options, function(err, res, body) { //send rq tới FPT
      if(err) {console.log(err);
      reject(err); //lỗi => lời hứa k đc thực hiện
    }
      else { 
        let data = JSON.parse(res.body);
        data = data.async;
        resolve(data);
      } 
  });
});
}