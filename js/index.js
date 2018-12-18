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
    to_active: function (a) {
        if (!a) {
            $(this.now_el).parent().attr("score", 0);
            $(this.now_el).parent().children("div").removeClass("active");
        }
        //包括点击的当前div
        let arr = $(a).prevAll();
        arr.push($(a).get(0));
        //选中样式添加
        $(a).nextAll().removeClass("active");
        $(arr).addClass("active");
        //添加分数data
        const now_html = $(a).html();
        switch (now_html) {
            case "极好":
                $(a).parent().attr("score", 8);
                break;
            case "极差":
                $(a).parent().attr("score", 1);
                break;
            default:
                $(a).parent().attr("score", $(a).html());
                break;
        }
    },
    //初始化
    init: function () {
        this.bad_offset = $("#score_start").offset().left;
        this.good_offset = $("#score_end").offset().left;
        this.bad_good_width = $("#score_start")[0].offsetWidth;
        this.other_width = $("#score_other")[0].offsetWidth;
    },
    socket_io: io(api.socket_url),
    //socket给服务端发送数据
    socket_fun: function (a) {
        //socket
        let key = $(a).attr("group");
        let obj = {};
        obj[key] = $(a).attr("score");
        this.socket_io.emit("vote", obj);
    },
    //各个组数组
    group: [],
    //渲染函数
    rendering: function () {
        for (let i in this.group) {
            //循环克隆渲染
            let sj = this.group[i];
            let el = $("#vote").clone(true).appendTo($(".vote_div"));
            el.children(".vote_group").html(sj.name);
            el.children(".score_div").attr("group", sj.id);
            el.removeClass("vis_hidden");
            if (sj.myvote) {
                el.find("button").remove();
                this.to_active($(el.children(".score_div").children()[sj.myvote.fraction - 1]));
                el.children("input").val(sj.myvote.ps).attr("disabled", "disabled");
                el.children("input").attr("rows", 3);
                if (!el.children("input").val()) {
                    el.children("input").val("无");
                }
                el.children(".score_div").children("div").unbind();
            }
        }
        //删除被克隆的元素
        $(".vote_div").children().first().remove();
    },
    pc_mouse_down: false,
}
$(function () {

    //初始化数据

    //判断登录
    if (getCookie("kx_user_id")) {
        show_loading();
        api.login_api(getCookie("kx_user_id")).then((mes) => {
            $("#user_id").html(mes.username + "，你好");
        }, function (err) {
            window.location.href = "login.html";
            delCookie("kx_user_id");
        }).then((mes) => {
            api.user_vote_history(getCookie("kx_user_id")).then((mes) => {
                variable.group = mes;
                variable.rendering();
                close_loading();
                body_show();
            })
        })
    } else {
        window.location.href = "login.html";
    }


    //提交按钮点击
    $("[data-upload]").on("click", function () {
        //数据库
        let obj = {
            "userid": getCookie("kx_user_id"),
            "orgid": $(this).parent().prevAll(".score_div").attr("group"),
            "fraction": $(this).parent().prevAll(".score_div").attr("score"),
            "ps": $(this).parent().prev().val()
        }
        show_loading();
        api.vote(obj).then((mes) => {
            close_loading();
            $.growl.notice({
                title: "提示",
                message: "打分成功"
            });
            $(this).parent().slideUp();
            if (!obj.ps) {
                $(this).parent().prev().val("无");
            }
            $(this).parent().prevAll(".score_div").children("div").unbind();
            //socket 传输
            variable.socket_fun($(this).parent().prevAll(".score_div"));
        }, function (err) {
            close_loading();
            $.growl.warning({
                title: "提示",
                message: err.responseJSON.message
            });
        });
    })

    //退出按钮点击
    $("#logout").on("click", function () {
        event.preventDefault();
        delCookie("kx_user_id");
        window.location.href = $(this).attr("href");
    })

    //手指按下去
    $(".score_div > div").on("touchstart", function (event) {
        variable.now_el = $(this);
        variable.move_el = $(this);
        variable.to_active(variable.now_el);
        variable.init();
    })

    //手指移动
    $(".score_div > div").on("touchmove", function (event) {
        let x = event.touches[0].clientX - variable.bad_offset;
        if (x < 0) {
            variable.move_el = "";
        } else if (x <= variable.bad_good_width) {
            variable.move_el = variable.now_el.parent().children("div")[0];
        } else if (x >= variable.good_offset) {
            variable.move_el = variable.now_ell.parent().children("div")[variable.now_el.parent().children().length - 1];
        } else {
            let list_choose = Math.ceil((x - variable.bad_good_width) / variable.other_width);
            variable.move_el = variable.now_el.parent().children("div")[list_choose];
        }
        variable.to_active(variable.move_el);
    })
    $(".score_div > div").on("mousedown", function (event) {
        variable.pc_mouse_down = true;
        variable.to_active($(this));
    })
    $(".score_div > div").on("mouseup", function (event) {
        variable.pc_mouse_down = false;
    })
    $(".score_div > div").on("mouseover", function (event) {
        if (variable.pc_mouse_down) {
            variable.to_active($(this));
        }
    })
})
$(window).resize(function () {
    variable.init();
});