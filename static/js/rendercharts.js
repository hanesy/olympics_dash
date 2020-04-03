// Universal Highcharts options

Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ',',
      numericSymbols: ["k", "m", "G", "T", "P", "E"],
    }
});

// gold, silver, bronze,
var medalColors = ["#D9A84E","#D9D5D2","#A6705D"];

// blue accent, red accent, frozen blue, greenish brown, sepia
var chartColors = ["#324759", "#A60321", "#CEE8F2", "#B5AF87", "#8F8684"];


// functions for generating charts
function stackedOlympianBar(selectDiv, title, x_axis, golds, silvers, bronzes, nonmedals){
    Highcharts.chart(selectDiv, {

        title: 
        {
            text: title
        },
        
        xAxis: 
        {
            categories: x_axis,
            crosshair: true,
            labels: {
                rotation: 270
            }
        },
    
        yAxis: 
        [{ // Primary yAxis    
            min: 0,
            labels: 
            {
                style: 
                {
                    color: chartColors[3]
                }
            },
            title: 
            {
                text: 'Olympians',
                style: 
                {
                    color: chartColors[3]
                }
            }
        }],
    
        plotOptions: 
        {
            column: 
            {
                stacking: 'normal'
            }
        },
        
        tooltip: {
            shared: true
        },

        legend: {
            reversed: true
        },

        series: 
        [
            {
                type: 'column',
                yAxis: 0,
                name: 'No medals',
                data: nonmedals,
                color: chartColors[2],
                stack: 'medalist'
            }, 
            {
                type: 'column',
                yAxis: 0,
                name: 'Bronze medals',
                data: bronzes, 
                color: medalColors[2],
                stack: 'medalist'
            }, 
            {
                type: 'column',
                yAxis: 0,
                name: 'Silver medals',
                data: silvers,
                color: medalColors[1],
                stack: 'medalist'
            }, 
            {
                type: 'column',
                yAxis: 0,
                name: 'Gold medals', 
                data: golds, 
                color: medalColors[0],
                stack: 'medalist'
            },
]
    });
}

function stackedOlympianHorBar(selectDiv, title, x_axis, golds, silvers, bronzes, nonmedals){
    Highcharts.chart(selectDiv, {
        chart: {
            type: 'bar'
        },
        title: 
        {
            text: title
        },
        
        xAxis: 
        {
            categories: x_axis,
            crosshair: true,
        },
    
        yAxis: 
        [{ // Primary yAxis    
            min: 0,
            labels: 
            {
                style: 
                {
                    color: chartColors[3]
                }
            },
            title: 
            {
                text: 'Olympians',
                style: 
                {
                    color: chartColors[3]
                }
            }
        }],
    
        plotOptions: 
        {
            series: 
            {
                stacking: 'normal'
            }
        },
        
        tooltip: {
            shared: true
        },

        legend: {
            reversed: true
        },

        series: 
        [
            {
                type: 'column',
                yAxis: 0,
                name: 'No medals',
                data: nonmedals,
                color: chartColors[2],
                stack: 'medalist'
            }, 
            {
                type: 'column',
                yAxis: 0,
                name: 'Bronze medals',
                data: bronzes, 
                color: medalColors[2],
                stack: 'medalist'
            }, 
            {
                type: 'column',
                yAxis: 0,
                name: 'Silver medals',
                data: silvers,
                color: medalColors[1],
                stack: 'medalist'
            }, 
            {
                type: 'column',
                yAxis: 0,
                name: 'Gold medals', 
                data: golds, 
                color: medalColors[0],
                stack: 'medalist'
            },
]
    });
}


function olympianPieBig(selectDiv, title, nonmedals, golds, silvers, bronzes){
    Highcharts.chart(selectDiv, {
        chart: 
        {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: 
        {
            text: title
        },
        
        tooltip: 
        {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: 
        {
            point: {
                valueSuffix: '%'
            }
        },

        plotOptions: 
        {
            pie: 
            {
                // allowPointSelect: true,
                // cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: 
        [
            {
                minPointSize: 10,
                innerSize: '20%',
                zMin: 0,
                name: '% All-Time',
                data: 
                [
                    {
                        name: 'Non-Medalist',
                        y: sumArray(nonmedals),
                        color: chartColors[2] // color match bar chart
                    }, 
                    {
                        name: 'Gold',
                        y: sumArray(golds),
                        color: medalColors[0] // color match bar chart
                    }, 
                    {
                        name: 'Silver',
                        y: sumArray(silvers),
                        color: medalColors[1] // color match bar chart
                    },
                    {
                        name: 'Bronze',
                        y: sumArray(bronzes),
                        color: medalColors[2]// color match bar chart
                    }
                ],

                showInLegend: true,
                dataLabels: 
                {
                    // enabled: true
                }
        }],
        
    });

}

function olympianPieSmall(selectDiv, title, nonmedals, golds, silvers, bronzes){
    Highcharts.chart(selectDiv, {
        chart: 
        {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: 
        {
            text: title,
            style: {
                "fontSize": "10px"
            }
        },
        
        tooltip: 
        {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: 
        {
            point: {
                valueSuffix: '%'
            }
        },

        plotOptions: 
        {
            pie: 
            {
                // allowPointSelect: true,
                // cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    // format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        legend:
        {
            enabled: false
        },

        series: 
        [
            {
                minPointSize: 10,
                innerSize: '20%',
                zMin: 0,
                name: '% All-Time',
                data: 
                [
                    {
                        name: 'Non-Medalist',
                        y: sumArray(nonmedals),
                        color: chartColors[2] // color match bar chart
                    }, 
                    {
                        name: 'Gold',
                        y: sumArray(golds),
                        color: medalColors[0] // color match bar chart
                    }, 
                    {
                        name: 'Silver',
                        y: sumArray(silvers),
                        color: medalColors[1] // color match bar chart
                    },
                    {
                        name: 'Bronze',
                        y: sumArray(bronzes),
                        color: medalColors[2]// color match bar chart
                    }
                ],

                showInLegend: true,
                dataLabels: 
                {
                    // enabled: true
                }
        }],
        
    });

}

function olympianLine(selectDiv, title, x_axis, medalist_perc){
    Highcharts.chart(selectDiv, {

        title: {
            text: title
        },
    
        // subtitle: {
        //     text: 'Source: thesolarfoundation.com'
        // },
    
        yAxis: {
            title: {
                text: 'Olympians with Medals (%)'
            },
            min: 0,
            labels :{
                format: '{value:,.0f}%',
            }
        },

        xAxis: {
            categories: x_axis,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            labels: {
                rotation: 270
            }
        },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                }
            },
            line: {
                color:chartColors[1]
            }

        },
    
        series: [{
            name: '% Medalists',
            data: medalist_perc,
            tooltip: {
                valueSuffix: '%',
                valueDecimals: 0
            }
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    
    });

}

function medalArea(selectDiv, title, x_axis, tgolds, tsilvers, tbronzes ){

    Highcharts.chart(selectDiv, {
        chart: {
            type: 'area'
        },
        title: {
            text: title
        },
        // subtitle: {
        //     text: 'Source: Wikipedia.org'
        // },
        xAxis: {
            categories: x_axis,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            },
            labels: {
                rotation: 270
            }
        },
        yAxis: {
            title: {
                text: 'Medals'
            },
            // labels: {
            //     formatter: function () {
            //         return this.value / 1000;
            //     }
            // }
        },
        tooltip: {
            split: true,
            // valueSuffix: ' millions'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        legend:{
            reversed: true
        },
        series: [ {
            name: 'Bronze Medals',
            data: tbronzes,
            color: medalColors[2]
        },
        {
            name: 'Silver Medals',
            data: tsilvers,
            color: medalColors[1]
        }, 
        {
            name: 'Gold Medals',
            data: tgolds,
            color: medalColors[0]
        },
    ]
    });
}

function gdpPopCombo(selectDiv, x_axis, population, gdp, perCapitaGdp){
    Highcharts.chart(selectDiv, {
        title: 
        {
            text: 'GDP, Population, and GDP per Capita'
        },
        subtitle: 
        {
            text: 'Source: World Bank'
        },
    
        xAxis: 
        [{
            categories: x_axis,
            crosshair: true
        }],
        
        yAxis: 
        [{ // Primary yAxis
            title: {
                text: 'GDP per Capita ($)',
                style: {
                    color: chartColors[3]
                }
            },
            labels: {
                // valuePrefix: "$",
                // format: '${value:,.0f}',
                // formatter: function() {
                //     if (this.value >= 1E6) {
                //       return ('$' + this.value / 1000000 + 'M');
                //     }
                //     return '$' + this.value / 1000 + 'k';
                //   },
                style: {
                    color: chartColors[3]
                },
    
            }
        }, 
        { // Secondary yAxis
            title: {
                text: 'GDP ($)',
                style: {
                    color: chartColors[4]
                }
            },
            labels: {
                // format: '${value}',
                // formatter: function() {
                //     if (this.value >= 1E6) {
                //       return '$' + this.value / 1000000 + 'M';
                //     }
                //     return '$' + this.value / 1000 + 'k';
                //   },
                style: {
                    color: chartColors[4]
                }
            },
            opposite: true
        }, 
        { // Third yAxis
            title: {
                text: 'Population',
                style: {
                    color: chartColors[0]
                }
            },
            labels: {
                // format: '{value:,f}',
                // formatter: function() {
                //     if (this.value >= 1E6) {
                //       return '$' + this.value / 1000000 + 'M';
                //     }
                //     return '$' + this.value / 1000 + 'k';
                //   },
                style: {
                    color: chartColors[0]
                }
            },

            opposite: true
        }
    ],
        tooltip: {
            shared: true,
        },
    
        series: [
            {
                name: 'GDP per Capita',
                type: 'column',
                yAxis: 0,
                data: perCapitaGdp,
                tooltip: {
                    valuePrefix: '$',
                    valueDecimals: 0
                },
                color: chartColors[3]
    
            }, 
            {
                name: 'GDP',
                type: 'spline',
                yAxis: 1,
                data: gdp,
                tooltip: 
                {
                    valuePrefix: '$'
                },
                color: chartColors[4]
            },
            {
                name: 'Population',
                type: 'spline',
                yAxis: 2,
                data: population,
                tooltip: 
                {
                    // valuePrefix: 'T'
                },
                color: chartColors[0]
            },
        ]
    });
}

function medalScatter(selectDiv, title, x_axis_label, winterPerCapitaGdp, winterMedals, winterCountries, winterGames, summerPerCapitaGdp, summerMedals, summerCountries, summerGames) {
    
    Highcharts.chart(selectDiv, {
        chart: {
            type: 'scatter'
        },
        title: {
            text: title
        },
        xAxis: {
            title: {
                enabled: true,
                text: x_axis_label
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Medal Count'
            }
        },
        // legend: {
        //     layout: 'vertical',
        //     align: 'left',
        //     verticalAlign: 'top',
        //     x: 100,
        //     y: 70,
        //     floating: true,
        //     backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
        //     borderWidth: 1
        // },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        },
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.name} <br> X-Value: {point.x: ,.0f}, <br>Y-Value: {point.y} Medals'
                },
            },
            series: {turboThreshold:10000}
        },
        series: [
            {
            name: 'Winter Medals',
            color: chartColors[0],
            data: scatterMatchArrays(winterPerCapitaGdp, winterMedals,winterCountries, winterGames),

            }, 
        
        {
            name: 'Summer Medals',
            color: chartColors[3],
            data: scatterMatchArrays(summerPerCapitaGdp, summerMedals, summerCountries, summerGames)
        }
    
    ]
    });
}

function olympianMedalBar(selectDiv, title, x_axis,medalist_perc){
    Highcharts.chart(selectDiv, {
        chart:{
            type: 'bar',
            // width: 100%,
        },
        title: 
        {
            text: title
        },
        
        xAxis: 
        {
            categories: x_axis,
            crosshair: true,
        },
    
        yAxis: {
            title: {
                text: 'Olympians with Medals (%)'
            },
            min: 0,
            labels :{
                format: '{value:,.0f}%',
            }
        },
    
        series: [{
            // dataSorting: {
            //     enabled: true
            // },
            name: '% Medalists',
            data: medalist_perc,
            tooltip: {
                valueSuffix: '%',
                valueDecimals: 0
            },
            color: chartColors[1]
        }],
            
    });
}

function stackedEventBar(selectDiv, title, x_axis, golds, silvers, bronzes){
    Highcharts.chart(selectDiv, {
        chart: {
            type: 'bar'
        },

        title: 
        {
            text: title
        },
        
        xAxis: 
        {
            categories: x_axis,
            crosshair: true,
        },
    
        yAxis: 
        [{ // Primary yAxis    
            min: 0,
            labels: 
            {
                style: 
                {
                    color: chartColors[3]
                }
            },
            title: 
            {
                text: 'Olympians',
                style: 
                {
                    color: chartColors[3]
                }
            }
        }],
    
        plotOptions: 
        {
            series: 
            {
                stacking: 'normal'
            }
        },
        
        tooltip: {
            shared: true
        },

        legend: {
            reversed: true
        },


        series: 
        [
            {
                type: 'column',
                yAxis: 0,
                name: 'Bronze medals',
                data: bronzes, 
                color: medalColors[2],
                stack: 'medalist'
            }, 
            {
                type: 'column',
                yAxis: 0,
                name: 'Silver medals',
                data: silvers,
                color: medalColors[1],
                stack: 'medalist'
            }, 
            {
                type: 'column',
                yAxis: 0,
                name: 'Gold medals', 
                data: golds, 
                color: medalColors[0],
                stack: 'medalist',

            },
]
    });
}

function countryBar(selectDiv, title, x_axis, countries){
    Highcharts.chart(selectDiv, {

        chart: {
            type: 'bar'
        },

        title: 
        {
            text: title
        },
        
        xAxis: 
        {
            categories: x_axis,
            crosshair: true,

        },
    
        yAxis: 
        [{ // Primary yAxis    
            min: 0,
            labels: 
            {
                style: 
                {
                    color: chartColors[3]
                }
            },
            title: 
            {
                text: 'Number of Countries',
                style: 
                {
                    color: chartColors[3]
                }
            }
        }],
        
        tooltip: {
            shared: true
        },

        legend: {
            enabled: false
        },


        series: 
        [
            {
                type: 'column',
                yAxis: 0,
                name: 'Participating Countries',
                data: countries, 
                color: chartColors[3],
                stack: 'medalist'
            }
]
    });
}
