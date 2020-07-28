const request = require('request').defaults({ encoding: null });
const speech = require('@google-cloud/speech');
//url = url của File MP3 được FPT TTS trả về sau khi đã có thể nghe được, tải được...
function asyncRecognizeGCSWords(url) { //sử dụng API Speech To text của google => get Text + timestamp từng word
return promise = new Promise((resolve,rejects)=>{
    let arr = []; //tạo arr để store timestamp
    request.get(url,async function(err,res){ //tiến hành get file MP3 trông qua url, 
        if(!err && res.statusCode == 200)
        {
            const client = new speech.SpeechClient();
            const config = {
                enableWordTimeOffsets: true, //true => get Text + timestamp từng word
                encoding: 'MP3',  //định dạng file
                sampleRateHertz: '16000', //tần số file âm thanh
                languageCode: 'vi-VN', //ngôn ngữ cần speech To Text
              };
              const request = { //tạo req để gửi tới google.
                config: config, 
                audio: {
                  content: Buffer.from(res.body).toString('base64') // âm thanh cần mã hóa => Base 64
              }
              };
              let i = 0;
              const [response] = await client.recognize(request);
              response.results.forEach(result => { 
                result.alternatives[0].words.forEach(wordInfo => { 
                  const startSecs = `${wordInfo.startTime.seconds}` + '.' + wordInfo.startTime.nanos / 1000000; //thời gian bắt đầu đọc word trong file MP3
                  const endSecs =`${wordInfo.endTime.seconds}` +'.' +wordInfo.endTime.nanos / 1000000; //thời gian kết thúc
                  i++;
                  let time = {
                        NumberOfWord: i,
                        word: wordInfo.word, 
                        timeStart: startSecs,
                        timeEnd: endSecs
                  }
                 arr.push(time);
                });
                resolve(arr);
              });
        }
    });
});
}
module.exports = asyncRecognizeGCSWords;