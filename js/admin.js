let myChart,
    option = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: [],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    fontSize: 15,
                },
                formatter: function (a) {
                    if (a.length > 8) {
                        a = a.slice(0, 8);
                        a = a + "..."
                    }
                    return a;
                }
            },
        }],
        yAxis: [{
            type: 'value',
            min: 0,
            max: 5,
        }],
        series: [{
            name: '分数',
            type: 'bar',
            barWidth: '60%',
            data: [],
            label: {
                normal: {
                    textStyle: {
                        color: "#000",
                        fontSize: 15
                    },
                    show: true,
                    position: 'top',
                },
            },
        }],
    },
    resize_fun = function () {
        //大于1200
        if (document.body.offsetWidth > 1198) {
            option.xAxis[0].axisLabel.textStyle.fontSize = 20;
            option.xAxis[0].axisLabel.formatter = function (a) {
                if (a.length > 8) {
                    a = a.slice(0, 8);
                    a = a + "..."
                }
                return a;
            }
            myChart.setOption(option);
        }
        //小于1200
        if (document.body.offsetWidth <= 1198) {
            option.xAxis[0].axisLabel.textStyle.fontSize = 15;
            option.xAxis[0].axisLabel.formatter = function (a) {
                if (a.length > 4) {
                    a = a.slice(0, 4);
                    a = a + "..."
                }
                return a;
            }
            myChart.setOption(option);
        }
        //小于700
        if (document.body.offsetWidth <= 700) {
            option.xAxis[0].axisLabel.formatter = function (a) {
                return "";
            }
            myChart.setOption(option);
        }
        myChart.resize();
    };
$(function () {
    myChart = echarts.init(document.getElementById('main'));
    let socket_io = io(api.socket_url);
    show_loading();
    //获取总数
    api.total().then((mes) => {
        close_loading();
        let ket_obj = [];
        option.xAxis[0].data = Object.keys(mes);
        option.series[0].data = Object.values(mes);
        option.yAxis[0].max = (Object.values(mes).max()) ? Object.values(mes).max() : 5;
        myChart.setOption(option);
    }).then((mes) => {
        //获取开关
        api.get_status().then((mes) => {
            if(mes === "ON"){
                $("#switch_btn").attr("checked", "checked");
            }
            if(getCookie('kx_user_id') != "999"){
                $("#switch_btn").attr("disabled", "disabled");
            }
        }, function(err){
            $.growl.warning({
                title: "提示",
                message: err.responseJSON.message
            });
        })
    });

    socket_io.on("vote", function (emit) {
        let y_max = option.yAxis[0].max;
        option.series[0].data[Object.keys(emit)[0][0] - 1] = parseInt(option.series[0].data[Object.keys(emit)[0][0] - 1] + parseInt(emit[Object.keys(emit)]));
        if (option.series[0].data[Object.keys(emit)[0][0] - 1] > y_max) {
            option.yAxis[0].max = option.series[0].data[Object.keys(emit)[0][0] - 1];
        }
        myChart.setOption(option);
    })
    $("[data-clear]").on("click", function () {
        show_loading();
        let user_id = getCookie("kx_user_id");
        api.clear({
            "userid": user_id
        }).then(function () {
            close_loading();
            $.growl.notice({
                title: "提示",
                message: "已清空"
            });
            option.series[0].data = [];
            myChart.setOption(option);
        }, function (error) {
            close_loading();
            let error_text = error.responseJSON.message;
            $.growl.warning({
                title: "提示",
                message: error_text
            });
        });
    });
    //监听指定开关
    layui.use(['form', 'layedit', 'laydate'], function(){
        let form = layui.form;
        form.on('switch(switchTest)', function(data){
            if(this.checked){
                api.change_status("ON").then(function(){
                    $.growl.notice({
                        title: "提示",
                        message: "评分系统开启"
                    });
                });
            }
            else{
                api.change_status("OFF");
                $.growl.warning({
                    title: "提示",
                    message: "评分系统关闭"
                });
            }
        });
    });
});
$(window).resize(function () {
    resize_fun();
})
window.onload = function () {
    resize_fun();
}