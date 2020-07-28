const FPT_AI_API =  require("../API/ttsFPT.js");

exports.getOnlyMP3 = async (req,res) =>{ // chỉ res về file MP3 thông thường, không có timstampe(thời gian đọc từng từ trong mp3)
    FPT_AI_API.FPT_TTS(req.body.text).then((data)=>{
        res.status(200).json({"mp3":data}); //trả về cho client link file : MP3, nhưng ngay thời điểm này, file MP3 chưa thể nghe ngay
        // cần đợi FPT call API CallBackUrl phía dưới
    })    
    .catch(err=>{
        console.log(err);
        res.status(403).json({"status":"faild to change"});
    })
}
// *=> em muốn là : KHI A GỬI req tứi server, server => FPT AI để lấy về link mp3, 
//chờ cho FPT AI gửi req callback tới => lúc này mới res lại về cho client.

exports.CallBackUrl = (req,res) =>{ //FPT URL CALL BACK SẼ GỌI FUNCTION NÀY
        //sau khi FPT call back url, nó sẽ gửi tới server của mình 1 cái request để báo rằng file MP3 đã sẵn sàng
        // Em muốn lúc này mới response về cho client của a link file MP3.
        if(req.body.success == true) {
            //success == true => file MP3 đã sẵn sàng
        }
}

exports.getMp3WihtTimestam = (req,res) =>{

}