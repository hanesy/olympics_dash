Highcharts.setOptions({
    lang: {
      decimalPoint: '.',
      thousandsSep: ',',
      numericSymbols: ["k", "m", "G", "T", "P", "E"],
    }
});


var firstLink = '/events_final/'

function init()
{
    var countries = [];
    var nocs = [];
    var events = [];

    d3.json(firstLink, function(data)
    {
        data.forEach(function(d) {
            var country = d.Country;
            var noc = d.NOC;
            var event = d.Game_Label;
            if (countries.includes(country)==false)
            {
                countries.push(country);
                nocs.push(noc);
            }
            if (events.includes(event)==false)
            {
                events.push(event);
            }
        })
        createDropDown("#selCountry", countries, nocs);
        createDropDown("#selEvent", events, events);
    });

    // createCharts('/events_final/USA')
};

function eventChanged(value){
    console.log(`event has changed to ${value}`);
    // var searchLink = `/events_final/${value}`
    // createCharts(searchLink);
    d3.select("#selCountry").property("value", "default");
}

function countryChanged(value){
    console.log(`country has changed to ${value}`);
    var searchLink = `/events_final/${value}`
    createCharts(searchLink);
    d3.select("#selEvent").property("value", "default");
}

function createCharts(searchLink) {
    d3.json(searchLink, function(data){
        console.log(data);

        var years = [];
        var games = [];
        var summerGames = [];
        var winterGames = [];

        var olympians = [];
        var summerOlympians = [];
        var winterOlympians = [];
        
        var golds = [];
        var summerGolds= [];
        var winterGolds=[];

        var silvers = [];
        var summerSilvers = [];
        var winterSilvers = [];
    
        var bronzes = [];
        var summerBronzes = [];
        var winterBronzes = [];

        var population = [];
        var summerPopulation = [];
        var winterPopulation = [];
        var gdp = [];
        var summerGdp = [];
        var winterGdp = [];

        // unpack each variable    
        data.forEach(function(d) {

            var year = d.Year;
            years.push(year);

            var game = d.Game_Label;
            games.push(game);

            var olympian = d.No_olympians
            olympians.push(olympian);

            var gold = d.Gold_athlete;
            golds.push(gold);

            var silver = d.Silver_athlete;
            silvers.push(silver);
            
            var bronze = d.Bronze_athlete;
            bronzes.push(bronze);

            var pop = d.Population;
            population.push(pop);

            var g = d.GDP;
            gdp.push(g);

            var season = d.Season;
            if (season == "Summer"){
                summerGames.push(game);
                summerOlympians.push(olympian);
                summerGolds.push(gold);
                summerSilvers.push(silver);
                summerBronzes.push(bronze);
                summerPopulation.push(pop);
                summerGdp.push(g);
            }
            else{
                winterGames.push(game);
                winterOlympians.push(olympian);
                winterGolds.push(gold);
                winterSilvers.push(silver);
                winterBronzes.push(bronze);
                winterPopulation.push(pop);
                winterGdp.push(g);
            }


        });

        var medals = [];
        var summerMedals = [];
        var winterMedals = [];
        var nonmedals = [];
        var summerNonmedals = [];
        var winterNonmedals=[];

        for (var i=0; i<games.length; i++){
            var medalist = golds[i]+silvers[i]+bronzes[i];
            var nonmedalist = olympians[i]-medalist;
            
            medals.push(medalist);
            nonmedals.push(nonmedalist);
        }
        
        for (var i=0; i<summerGames.length; i++){
            var medalist = summerGolds[i]+summerSilvers[i]+summerBronzes[i];
            var nonmedalist = summerOlympians[i]-medalist;
            
            summerMedals.push(medalist);
            summerNonmedals.push(nonmedalist);
        }

        for (var i=0; i<winterGames.length; i++){
            var medalist = winterGolds[i]+winterSilvers[i]+winterBronzes[i];
            var nonmedalist = winterOlympians[i]-medalist;
            
            winterMedals.push(medalist);
            winterNonmedals.push(nonmedalist);
        }
        
        var winter_medalist_perc= divideArraysTimesHundred(winterMedals, winterOlympians);
        var winter_gold_perc = divideArraysTimesHundred(winterGolds, winterOlympians);
        var no_perc;

        var perCapitaGdp = divideArrays(gdp, population);
        var summerPerCapitaGdp = divideArrays(summerGdp, summerPopulation);
        var winterPerCapitaGdp = divideArrays(winterGdp, winterPopulation);

        olympianCombo('chart1', 'all games', games, olympians, no_perc, no_perc, golds, silvers, bronzes);
        olympianCombo('chart1-summer', 'summer games', summerGames, summerOlympians, no_perc, no_perc, summerGolds, summerSilvers, summerBronzes);
        olympianCombo('chart1-winter', 'winter games', winterGames, winterOlympians, winter_medalist_perc, winter_gold_perc, winterGolds, winterSilvers, winterBronzes);
        olympianPie('chart1-pie', nonmedals, golds, silvers, bronzes, winterNonmedals, winterGolds, winterSilvers, winterBronzes, summerNonmedals, summerGolds, summerSilvers, summerBronzes);
        gdpPopCombo('chart2', years, population, gdp, perCapitaGdp);
        gdpCapMedalScatter('test', winterPerCapitaGdp, winterMedals, winterGolds, summerPerCapitaGdp, summerMedals, summerGolds);
    });
}

function divideArraysTimesHundred (numerator, denominator) {
    var array = []
    
    for (var i=0; i<denominator.length; i++){
        var quotient = numerator[i]/denominator[i] * 100;
        
        array.push(quotient);
    };

    return array;
}

function divideArrays (numerator, denominator) {
    var array = []
    
    for (var i=0; i<denominator.length; i++){
        var quotient = numerator[i]/denominator[i];
        
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

function createDropDown(selectDiv, arrayName, arrayNoc){
    var dropDown = d3.select (selectDiv);
    dropDown.append("option").attr("value", "default").text("Select Options");
    for (var i = 0; i < arrayName.length; i++) {
      dropDown.append("option").attr("value", arrayNoc[i]).text(arrayName[i]);
    }
}

function olympianCombo(selectDiv, type, games, olympians, medalist_perc, gold_perc, golds, silvers, bronzes){
    Highcharts.chart(selectDiv, {
  
        title: 
        {
            text: `Olympians Over Time (with % medal award) (${type})`
        },
        
        xAxis: 
        {
            categories: games,
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
                format: '{value:,.0f} %',
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
                    valueSuffix: ' %',
                    valueDecimals: 0
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
                    valueSuffix: ' %',
                    valueDecimals: 0
                }
            }]
    });
}

function olympianPie(selectDiv, nonmedals, golds, silvers, bronzes, winterNonmedals, winterGolds, winterSilvers, winterBronzes, summerNonmedals, summerGolds, summerSilvers, summerBronzes){
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
            text: 'All-Time Olympians (with % medal award)'
        },
        labels: {
            items: [{
                html: 'Both Games',
                style: {
                    left: '120px',
                    top: '18px'
                }
            },
            {
                html: 'Winter Games',
                style: {
                    left: '330px',
                    top: '18px'
                }
            },
            {
                html: 'Summer Games',
                style: {
                    left: '330px',
                    top: '218px'
                }
            }
            ]
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
                name: 'Total Medal Count',
                data: 
                [
                    {
                        name: 'Non-Medalist',
                        y: sumArray(nonmedals),
                        color: Highcharts.getOptions().colors[0] // color match bar chart
                    }, 
                    {
                        name: 'Gold',
                        y: sumArray(golds),
                        color: Highcharts.getOptions().colors[3] // color match bar chart
                    }, 
                    {
                        name: 'Silver',
                        y: sumArray(silvers),
                        color: Highcharts.getOptions().colors[2] // color match bar chart
                    },
                    {
                        name: 'Bronze',
                        y: sumArray(bronzes),
                        color: Highcharts.getOptions().colors[1] // color match bar chart
                    }
                ],
                center: [150, 100],
                size: 100,
                showInLegend: true,
                dataLabels: 
                {
                    // enabled: true
                }
        },
        {
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'Winter Medal Count',
            data: 
            [
                {
                    name: 'Winter Non-Medalist',
                    y: sumArray(winterNonmedals),
                    color: Highcharts.getOptions().colors[0] // color match bar chart
                }, 
                {
                    name: 'Winter Gold',
                    y: sumArray(winterGolds),
                    color: Highcharts.getOptions().colors[3] // color match bar chart
                }, 
                {
                    name: 'Winter Silver',
                    y: sumArray(winterSilvers),
                    color: Highcharts.getOptions().colors[2] // color match bar chart
                },
                {
                    name: 'Winter Bronze',
                    y: sumArray(winterBronzes),
                    color: Highcharts.getOptions().colors[1] // color match bar chart
                }
            ],
            center: [350, 50],
            size: 60,
            // showInLegend: true,
            dataLabels: 
            {
                // enabled: true
            }
        },
        {
            minPointSize: 10,
            innerSize: '20%',
            zMin: 0,
            name: 'Winter Medal Count',
            data: 
            [
                {
                    name: 'Summer Non-Medalist',
                    y: sumArray(summerNonmedals),
                    color: Highcharts.getOptions().colors[0] // color match bar chart
                }, 
                {
                    name: 'Summer Gold',
                    y: sumArray(summerGolds),
                    color: Highcharts.getOptions().colors[3] // color match bar chart
                }, 
                {
                    name: 'Summer Silver',
                    y: sumArray(summerSilvers),
                    color: Highcharts.getOptions().colors[2] // color match bar chart
                },
                {
                    name: 'Summer Bronze',
                    y: sumArray(summerBronzes),
                    color: Highcharts.getOptions().colors[1] // color match bar chart
                }
            ],
            center: [350, 150],
            size: 60,
            // showInLegend: true,
            dataLabels: 
            {
                // enabled: true
            }
        }
    
    
    
    ]
    });

}

function gdpPopCombo(selectDiv, years, population, gdp, perCapitaGdp){
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
            categories: years,
            crosshair: true
        }],
        
        yAxis: 
        [{ // Primary yAxis
            title: {
                text: 'GDP per Capita ($)',
                style: {
                    color: Highcharts.getOptions().colors[0]
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
                    color: Highcharts.getOptions().colors[0]
                },
    
            }
        }, 
        { // Secondary yAxis
            title: {
                text: 'GDP ($)',
                style: {
                    color: Highcharts.getOptions().colors[1]
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
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true
        }, 
        { // Third yAxis
            title: {
                text: 'Population',
                style: {
                    color: Highcharts.getOptions().colors[2]
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
                    color: Highcharts.getOptions().colors[2]
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
                }
    
            }, 
            {
                name: 'GDP (in UNITS HERE)',
                type: 'spline',
                yAxis: 1,
                data: gdp,
                tooltip: 
                {
                    valuePrefix: '$'
                }
            },
            {
                name: 'Population',
                type: 'spline',
                yAxis: 2,
                data: population,
                tooltip: 
                {
                    // valuePrefix: 'T'
                }
            },
        ]
    });
}

function gdpCapMedalScatter(selectDiv, winterPerCapitaGdp, winterMedals, winterGolds, summerPerCapitaGdp, summerMedals, summerGolds) {
    var trace1 = {
        x: winterPerCapitaGdp,
        y: winterMedals,
        // mode: 'markers+text',
        type: 'scatter',
        mode: 'markers',
        name: 'Winter Medals',
        // text: "Total Medals Country + Year",
        // textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
            },
        marker: { size: 12 }
        };
    
    var trace2 = {
        x: summerPerCapitaGdp,
        y: summerMedals,
        // mode: 'markers+text',
        type: 'scatter',
        mode: 'markers',
        name: 'Summer Medals',
        // text: "Total Medals Country + Year",
        // textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
            },
        marker: { size: 12 }
        };

    var trace3 = {
        x: summerPerCapitaGdp,
        y: summerGolds,
        // mode: 'markers+text',
        type: 'scatter',
        mode: 'markers',
        name: 'Summer Gold Medals',
        // text: "Total Medals Country + Year",
        // textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
            },
        marker: { size: 12 }
        };

    var trace4 = {
        x: winterPerCapitaGdp,
        y: winterGolds,
        // mode: 'markers+text',
        type: 'scatter',
        mode: 'markers',
        name: 'Winter Gold Medals',
        // text: "Total Medals Country + Year",
        // textposition: 'top center',
        textfont: {
            family:  'Raleway, sans-serif'
            },
        marker: { size: 12 }
        };
    

        var data = [ trace1, trace2, trace3, trace4 ];
  
        var layout = {
            legend: 
            {
                y: 0.5,
                yref: 'paper',
                font: {
                family: 'Arial, sans-serif',
                size: 20,
                color: 'grey',
                }
            },
            title:'# Medals and GDP per Capita'
            };
            
            Plotly.newPlot(selectDiv, data, layout);
}

init();