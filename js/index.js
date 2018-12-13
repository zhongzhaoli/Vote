let variable = {
    //点击的元素
    now_el: "",
    //极差元素开始点
    bad_offset: "",
    //极好元素开始点
    good_offset: "",
    //极好极差宽度
    bad_good_width: "",
    //普通宽度
    other_width: "",
    //移动到的元素
    move_el: "",
    //选中函数
    to_active: function(a){
        if(!a){
            $(this.now_el).parent().children("div").removeClass("active");
        }
        let arr = $(a).prevAll();
        arr.push($(a).get(0));
        
        $(a).nextAll().removeClass("active");
        $(arr).addClass("active");
    },
    //初始化
    init: function(){
        this.bad_offset = $("#score_start").offset().left;
        this.good_offset = $("#score_end").offset().left;
        this.bad_good_width = $("#score_start")[0].offsetWidth;
        this.other_width = $("#score_other")[0].offsetWidth;
    }

}
$(function(){
    
    variable.init();

    $(".score_div > div").on("touchstart", function(event){
        variable.now_el = $(this);
        variable.to_active(variable.now_el);
    })
    $(".score_div > div").on("touchmove", function(event){
        let x = event.touches[0].clientX - variable.bad_offset;
        if(x < 0){
            variable.move_el = "";
        }
        else if(x <= variable.bad_good_width){
            variable.move_el = variable.now_el.parent().children("div")[0];
        }
        else if(x >= variable.good_offset){
            variable.move_el = variable.now_el.parent().children("div")[variable.now_el.parent().children().length - 1];            
        }
        else{
            let list_choose =  Math.ceil((x - variable.bad_good_width) / variable.other_width);
            variable.move_el = variable.now_el.parent().children("div")[list_choose]; 
        }
        variable.to_active(variable.move_el);
    })
})
$(window).resize(function(){
    variable.init();
});