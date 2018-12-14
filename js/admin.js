
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
                    fontSize: 12,
                }
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'分数',
            type:'bar',
            barWidth: '60%',
            data:[],
        }
    ]
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

})