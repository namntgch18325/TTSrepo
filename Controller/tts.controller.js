const FPT_AI_API =  require("../API/ttsFPT.js");
// use a map to save a lot of resolve()
const taskMap = new Map(); // biến đánh dấu trạng thái sync

exports.getOnlyMP3 = async (req,res) =>{ 
        console.log("received req from user")
        const data = await  FPT_AI_API.FPT_TTS(req.body.text) // sync func
        console.log("Done send req to FPT AI")
        const result = await waitForCallback(data); // sync func
        console.log("Done process")
        res.status(200).json({"mp3":data}); 
}
const waitForCallback = (taskId) => { // hàm trung gian 
    console.log("start waitForCallback")
    return new Promise((resolve, reject) => {
        const task = {};
        task.id = taskId; // khai báo biến này để check trạng thái 
        task.onComplete = (data) => { // resolved
            resolve(data);
            console.log("Resolved process")
        };
        task.onError = () => {
            reject();
        };
        taskMap.set(task.id, task); // set taskMap để đợi đến khi callBackUrl xong
    });
}; 

exports.CallBackUrl = (req,res) =>{ 
        console.log("CallBackUrl is called")
        let result;
        let taskId = req.body.message
        if(req.body.success == true) {
            //success == true => file MP3 đã sẵn sàng
            result = "solved"
        }else result = "rejected"
        //báo complete để trả về resolve cho waitForCallback
        console.log("Received Callback")
        taskMap.get(taskId).onComplete(result);
        console.log("Completed Callback")
        //clean
        taskMap.delete(taskId);
        
}

exports.getMp3WihtTimestam = (req,res) =>{

}