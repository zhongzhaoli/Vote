$(function(){
    //区分线上线上环境
    $("[data-login]").on("click", function(){
        show_loading();
        api.login_api($("[name='id']").val())
        .then((mes) => {
            close_loading();
            setCookie("kx_user_id",mes.id);
            window.location.href = "./index.html";
            return;
        }, function(err){
            close_loading();
            $.growl.error({title: "提示", message: err.responseJSON.message});
        });
    });
})