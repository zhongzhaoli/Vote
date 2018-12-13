
$(function(){
    let socket_io = io(api.socket_url);

    socket_io.on("vote", function(emit){
        var option = myChart.getOption();
        option.series[0].data[Object.keys(emit) - 1] = parseInt(option.series[0].data[Object.keys(emit) - 1] + parseInt(emit[Object.keys(emit)]));
        myChart.setOption(option);    
    })


    var myChart = echarts.init(document.getElementById('main'));
    option = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'asd'],
                axisTick: {
                    alignWithLabel: true
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
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:[0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
    };
    myChart.setOption(option);
})

