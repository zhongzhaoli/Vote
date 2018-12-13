
$(function(){
    let img = new Image();
    img.onload = function(){

    }
    img.src = "../images/loading.gif";
})

const show_loading = function(){
    if($(".loading").length){
        $(".loading").remove();
    }
    let a = $("<div class='loading'><img src='./images/loading.gif'></div>").appendTo($("body"));
    a.show();
}
const close_loading = function(){
    $(".loading").remove();
}
const body_show = function(){
    $("[data-body]").show();
}