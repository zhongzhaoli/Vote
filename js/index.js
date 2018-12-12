$(function(){
    $(".score_div > div").on("touchmove", function(){
        let arr = $(this).prevAll();
        arr.push($(this).get(0));
        
        $(this).nextAll().removeClass("active");
        $(arr).addClass("active");
    })
})