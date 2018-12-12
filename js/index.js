$(function(){
    let flag = false;
    $(".score_div > div").on("mousedown", function(){
        flag = true;
    })
    $(".score_div > div").on("mouseup", function(){
        flag = true;
    })
    $(".score_div > div").on("mousemove", function(){
        let arr = $(this).prevAll();
        arr.push($(this).get(0));
        
        $(this).nextAll().removeClass("active");
        $(arr).addClass("active");
    })
})