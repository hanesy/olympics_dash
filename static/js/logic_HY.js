// Olympians over time (% medal award over time?)
//  [stacked bar chart or D3 JS] [Heain]

// d3.csv("olympiandata.json", function(data) {
//     console.log(data)
// });

d3.json('/olympians_team/USA', function(data){
    console.log(data);
});

// I think I should use not years, but summer-winter olympics
var years = [1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992,1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016];

var olympians = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];

var golds = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
var silvers = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];
var bronzes = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];

var medals = [];
var nonmedals = [];
for (var i=0; i<years.length; i++){
    var medalist = golds[i]+silvers[i]+bronzes[i];
    var nonmedalist = olympians[i]-medalist;
    
    medals.push(medalist);
    nonmedals.push(nonmedalist);
}

var medalist_perc= divideArrays(medals, olympians);
var gold_perc = divideArrays(golds, olympians);

var population = [1960, 1964, 1968, 1972, 1976, 1980, 1984, 1988, 1992, 1994, 1996, 1998, 2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016]
var gdp = [100008790, 100006095, 100009214, 100000361, 100006817, 100001518, 100007779, 100009036, 100002822, 100003445, 100000356, 100009372, 100009034, 100000995, 100008994, 100003269, 100008958, 100000317, 100008620, 100005227, 100004029]
var perCapitaGdp = divideArrays(gdp, population);

function divideArrays (numerator, denominator) {
    var array = []
    
    for (var i=0; i<denominator.length; i++){
        var quotient = numerator[i]/denominator[i] * 100;
        
        array.push(quotient);
    };

    return array;
}

function sumArray (array){
    var sum = 0;
    for (var i=0; i<array.length; i++){
        sum = sum + array[i];
    }
    return sum;
}

Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ','
    }
});

// Olympian Combo Chart
Highcharts.chart('chart1', {
  
    title: 
    {
        text: 'Olympians Over Time (with % medal award)'
    },
    
    xAxis: 
    {
        categories: years,
        crosshair: true
    },

    yAxis: 
    [{ // Primary yAxis
        
        min: 0,
        labels: 
        {
            style: 
            {
                color: Highcharts.getOptions().colors[1]
            }
        },
        title: 
        {
            text: 'Olympians',
            style: 
            {
                color: Highcharts.getOptions().colors[1]
            }
        }
    }, 
    
    { // Secondary yAxis
        
        min: 0,
        max: 100,

        title: 
        {
            text: '% Medalists',
            style: {
                color: Highcharts.getOptions().colors[0]
            }
        },
        labels:
        {
            format: '{value} %',
            style: 
            {
                color: Highcharts.getOptions().colors[0]
            }
        },
        
        opposite: true
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

    series: 
    [
        {
            type: 'column',
            yAxis: 0,
            name: 'Total Olympians',
            data: olympians,
            stack: 'olympian'
        }, 
        {
            type: 'column',
            yAxis: 0,
            name: 'Bronze',
            data: bronzes, 
            stack: 'medalist'
        }, 
        {
            type: 'column',
            yAxis: 0,
            name: 'Silver',
            data: silvers,
            stack: 'medalist'
        }, 
        {
            type: 'column',
            yAxis: 0,
            name: 'Gold', 
            data: golds, 
            stack: 'medalist'
        },
        {
            type: 'spline',
            yAxis: 1, 
            name: '% medalist',
            data: medalist_perc,
            marker: 
            {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            },
            tooltip: {
                valueSuffix: ' %'
            }

        }, 
        {
            type: 'spline',
            yAxis: 1, 
            name: '% gold medalist',
            data: gold_perc,
            marker: 
            {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[4],
                fillColor: 'gold'
            },
            tooltip: {
                valueSuffix: ' %'
            }
        }]
});

// Olympian Pie Chart
// Highcharts.chart('chart1-pie', {
//     chart: 
//     {
//         plotBackgroundColor: null,
//         plotBorderWidth: null,
//         plotShadow: false,
//         type: 'pie'
//     },
//     title: 
//     {
//         text: 'All-Time Olympians (with % medal award)'
//     },
//     tooltip: 
//     {
//         pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
//     },
//     accessibility: 
//     {
//         point: {
//             valueSuffix: '%'
//         }
//     },
//     plotOptions: 
//     {
//         pie: 
//         {
//             allowPointSelect: true,
//             cursor: 'pointer',
//             dataLabels: {
//                 enabled: true,
//                 format: '<b>{point.name}</b>: {point.percentage:.1f} %'
//             }
//         }
//     },

//     series: 
//     [
//         {
//             minPointSize: 10,
//             innerSize: '20%',
//             zMin: 0,
//         name: 'Total Medal Count',
//         data: 
//         [
//             {
//                 name: 'Non-Medalist',
//                 y: sumArray(nonmedals),
//                 color: Highcharts.getOptions().colors[0] // color match bar chart
//             }, 
//             {
//                 name: 'Gold',
//                 y: sumArray(golds),
//                 color: Highcharts.getOptions().colors[3] // color match bar chart
//             }, 
//             {
//                 name: 'Silver',
//                 y: sumArray(silvers),
//                 color: Highcharts.getOptions().colors[2] // color match bar chart
//             },
//             {
//                 name: 'Bronze',
//                 y: sumArray(bronzes),
//                 color: Highcharts.getOptions().colors[1] // color match bar chart
//             }
//         ],
//         // center: [150, 100],
//         // size: 100,
//         showInLegend: true,
//         dataLabels: 
//         {
//             enabled: true
//         }
//     }]
// });


// // Aspirational: Correlation between medals vs GDP or Population

// // GDP over time [Heain]
// // Population over time [Heain]
// // GDP per Capita
// // Need to have a different data pull for this.
// Highcharts.chart('chart2', {
//     title: 
//     {
//         text: 'GDP, Population, and GDP per Capita'
//     },
//     subtitle: 
//     {
//         text: 'Source: World Bank'
//     },

//     xAxis: 
//     [{
//         categories: years,
//         crosshair: true
//     }],
    
//     yAxis: 
//     [{ // Primary yAxis
//         title: {
//             text: 'GDP per Capita',
//             style: {
//                 color: Highcharts.getOptions().colors[2]
//             }
//         },
//         labels: {
//             format: '${value:,.0f}',
//             style: {
//                 color: Highcharts.getOptions().colors[2]
//             },

//         }
//     }, 
//     { // Secondary yAxis
//         title: {
//             text: 'GDP (in UNITS HERE)',
//             style: {
//                 color: Highcharts.getOptions().colors[0]
//             }
//         },
//         labels: {
//             format: '${value:,f}',
//             style: {
//                 color: Highcharts.getOptions().colors[0]
//             }
//         },
//         opposite: true
//     }, 
//     { // Third yAxis
//         labels: {
//             format: '{value:,f}',
//             style: {
//                 color: Highcharts.getOptions().colors[1]
//             }
//         },
//         title: {
//             text: 'Population',
//             style: {
//                 color: Highcharts.getOptions().colors[1]
//             }
//         },
//         opposite: true
//     }
// ],
//     tooltip: {
//         shared: true,
//         // pointFormat: '<b>{series.name} :</b>' + '<b>{point.y:,.0f}</b>'
//     },

//     series: [
//         {
//             name: 'GDP per Capita',
//             type: 'column',
//             yAxis: 0,
//             data: perCapitaGdp,
//             tooltip: {
//                 valuePrefix: '$',
//                 valueDecimals: 0
//             }

//         }, 
//         {
//             name: 'GDP (in UNITS HERE)',
//             type: 'spline',
//             yAxis: 1,
//             data: gdp,
//             tooltip: 
//             {
//                 valuePrefix: '$'
//             }
//         },
//         {
//             name: 'Population',
//             type: 'spline',
//             yAxis: 2,
//             data: population,

//         },
//     ]
// });


// // Potential to have this on HighCharts Too

// // All Medals
// // All Golds
// // Winter Medals
// // Winter Golds
// // Summer Medals
// // Summer Golds
// var country_year = ["country - year", "country - year", "country - year", 
//                     "country - year", "country - year", "country - year"];

// var medals_country_year = [10, 10, 100, 20, 15, 10, 98, 100];

// // should i normalize this by percentile?
// var perCapitaGdp_country_year = [951, 1730, 4120, 21230, 2130, 12309];

// var golds_country_year = [1, 1, 3, 1, 4, 1, 40, 50];

// // Medals <-> GDP per Capita [Heain]
// var trace1 = {
//     x: perCapitaGdp_country_year,
//     y: medals_country_year,
//     mode: 'markers+text',
//     type: 'scatter',
//     name: 'All Medals',
//     text: "Total Medals Country + Year",
//     textposition: 'top center',
//     textfont: {
//       family:  'Raleway, sans-serif'
//     },
//     marker: { size: 12 }
//   };
  
// var trace2 = {
//     x: perCapitaGdp_country_year,
//     y: golds_country_year,
//     mode: 'markers+text',
//     type: 'scatter',
//     name: 'Golds',
//     text: "Gold Medals Country + Year",
//     textfont : {
//         family:'Times New Roman'
//     } ,
//     textposition: 'bottom center',
//     marker: { size: 12 }
//     };
  
//   var data = [ trace1, trace2 ];
  
//   var layout = {
//     xaxis: 
//     {
//     //   range: [ 0.75, 5.25 ]
//     },
//     yaxis: 
//     {
//       range: [0, 150]
//     },
//     legend: 
//     {
//       y: 0.5,
//       yref: 'paper',
//       font: {
//         family: 'Arial, sans-serif',
//         size: 20,
//         color: 'grey',
//       }
//     },
//     title:'# Medals and GDP per Capita'
//   };
  
//   Plotly.newPlot('chart3', data, layout);