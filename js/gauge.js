var Gauge = {};
Gauge.ChartList = {};     
/**
 * 生成温湿计图表 
 * 
 *@param{string}elementId   显示温湿计表的HTML元素id
 *@param{number}temperature 温度
 *@param{number}humidity    湿度
 *@return 
*/
Gauge.Hygrothermograph = function(elementId, temperature, humidity){
    var ele = document.getElementById(elementId);
    var myChart = this.ChartList[elementId];   
    if(!myChart){        
        myChart = echarts.init(ele); 
        this.ChartList[elementId] = myChart;
    }else{ 
        var option = myChart.getOption();
        option.series[0].data[0].value = humidity;
        option.series[1].data[0].value = temperature;
        myChart.setOption(option, true); 
        return;
    }
    
    var option = {
    tooltip : {
        formatter: function (params, ticket, callback) {
            // console.log(params.data.name);
			var unit = " 度";
            if(params.data.name == "湿度") unit = " %";
			return params.data.name + " : " + params.data.value + unit;
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    series: [
        {
            name: '湿度',
            center:['50%','85%'],
            type: 'gauge',
            radius: '55%',
            startAngle: 200,
            endAngle: -20,
            min: 20,
            max: 100,
            splitNumber: 8, 
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 6,
                    color:[[0.25, '#6386ce'], [0.62, '#91d7ae'], [1, '#ff9931']]
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 8,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 10,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            }, 
            title:{
                fontSize:12
            },
            detail: {formatter:'{value}%', fontSize:12},
            axisLabel: {
                fontSize:10
            },
            data: [{value: humidity, name: '湿度'}]
        },{
            name: '温度',
            type: 'gauge',
            startAngle: 210,
            endAngle: -30,
            radius: '100%',
            z: 3,
            min: -30,
            max: 50,
            splitNumber: 8, 
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 8,
                    color:[[0.6, '#6386ce'], [0.73, '#91d7ae'], [1, '#ff9931']]
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 12,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 14,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            axisLabel: {
                backgroundColor: 'auto',
                borderRadius: 2,
                color: '#eee',
                padding: 3,
                textShadowBlur: 2,
                textShadowOffsetX: 1,
                textShadowOffsetY: 1,
                textShadowColor: '#222'
            },
            title : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: 14,
                fontStyle: 'italic'
            },
            detail : {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                formatter: function (value) {
                    value = (value + '').split('.');
                    value.length < 2 && (value.push('00'));
                    return ('00' + value[0]).slice(-2)
                        + '.' + (value[1] + '00').slice(0, 2);
                },
                offsetCenter:[0, '-20%'], 
                fontSize: 14,
                borderRadius: 3, 
                borderColor: '#aaa',
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                borderWidth: 1,
                textBorderColor: '#000', 
                fontFamily: 'Arial',
                width: 40,
                color: '#9b9',
                rich: {}
            },
            data:[{value: temperature, name: '温度'}]
        },
    ]};
    
    myChart.setOption(option, true);
}
