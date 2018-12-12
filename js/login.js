$(function(){
    (typeof baseUrl !== 'undefined') ? api.url = baseUrl : api.url = "http://10.1.53.123:6666";
    $("[data-login]").on("click", function(){
        api.login_api($("[name='id']").val()).then((mes) => {
            console.log(mes);
        });
    });
})