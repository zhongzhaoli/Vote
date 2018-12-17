
let myChart, 
option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '0%',
        right: '0%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : [],
            axisTick: {
                alignWithLabel: true
            },
            axisLabel: {
                interval: 0,
                textStyle: {
                    fontSize: 15,
                },
                formatter: function(a){
                    if(a.length > 8){
                        a = a.slice(0,8);
                        a = a + "..."
                    }
                    return a;
                }
            },
        }
    ],
    yAxis : [
        {
            type : 'value',
        }
    ],
    series : [
        {
            name:'分数',
            type:'bar',
            barWidth: '60%',
            data:[],
            label: {
                normal: {
                    textStyle:{
                        color: "#000",
                        fontSize: 15
                    },
                    show: true,
                    position: 'top',
                },
            },
        }
    ],
},
resize_fun = function(){
    //大于1200
    if(document.body.offsetWidth > 1198){
        option.xAxis[0].axisLabel.textStyle.fontSize = 20;
        option.xAxis[0].axisLabel.formatter = function(a){
            if(a.length > 8){
                a = a.slice(0,8);
                a = a + "..."
            }
            return a;
        }
        myChart.setOption(option);    
        myChart.setOption(option);    
    }
    //小于1200
    if(document.body.offsetWidth <= 1198){
        option.xAxis[0].axisLabel.textStyle.fontSize = 15;
        option.xAxis[0].axisLabel.formatter = function(a){
            if(a.length > 4){
                a = a.slice(0,4);
                a = a + "..."
            }
            return a;
        }
        myChart.setOption(option);    
    }
    //小于700
    if(document.body.offsetWidth <= 700){
        option.xAxis[0].axisLabel.formatter = function(a){
            return "";
        }
        myChart.setOption(option);    
    }
    myChart.resize();
};
$(function(){
    myChart = echarts.init(document.getElementById('main'));
    let socket_io = io(api.socket_url);

    api.total().then((mes) => {
        let ket_obj = [];
        option.xAxis[0].data = Object.keys(mes);
        option.series[0].data = Object.values(mes);
        myChart.setOption(option);        
    })

    socket_io.on("vote", function(emit){
        var option = myChart.getOption();
        option.series[0].data[Object.keys(emit)[0][0] - 1] = parseInt(option.series[0].data[Object.keys(emit)[0][0] - 1] + parseInt(emit[Object.keys(emit)]));
        myChart.setOption(option);    
    })
});
$(window).resize(function(){
    resize_fun();
})
window.onload = function(){
    resize_fun();
}