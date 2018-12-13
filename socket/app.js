var ex = require('express')();  //加载模块
var http = require('http').Server(ex); 
var io = require('socket.io')(http);  //加载socket 模块


http.listen(1080,function(){
    console.log('http://127.0.0.1:1080');  //http URL
})


io.on('connection', function(socket){
    socket.on("vote", function(obj){
        io.emit("vote", obj);
        console.log(obj);
    })
});