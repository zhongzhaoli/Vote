$(function(){
    //区分线上线上环境
    $("[data-login]").on("click", function(){
        api.login_api($("[name='id']").val())
        .then((mes) => {
            setCookie("kx_user_id",mes.id);
            window.location.href = "./index.html";
            return;
        }, function(err){
            $.growl.error({title: "登录失败", message: err.responseJSON.message});
        });
    });
})