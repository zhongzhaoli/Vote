$(function(){
    //区分线上线上环境
    (typeof baseUrl !== 'undefined') ? api.url = baseUrl : api.url = "http://10.1.53.123:9999";
    $("[data-login]").on("click", function(){
        api.login_api($("[name='id']").val()).then((mes) => {
            console.log(mes);
        }).catch((err) => {
            $.growl.error({title: "错误标题", message: "错误消息内容!"});
        });
    });
})