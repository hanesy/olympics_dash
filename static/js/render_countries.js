// Initialize Function -- runs at the end of JS
function init()
{
    var countries = [];
    var nocs = [];
    var initCountryLink = '/NOC_Country_list/'

    d3.json(initCountryLink, function(data)
    {
        data.forEach(function(d) {
            var country = d.Country;
            var noc = d.NOC;
            if (countries.includes(country)==false)
            {
                countries.push(country);
                nocs.push(noc);
            }
        })
        createDropDownCountry("#selCountry", countries, nocs);
        d3.select("#selCountry").property("value", "WLD");
    });
    createDefault();
};

// Handle Change
function countryChanged(value){
    console.log(`country has changed to ${value}`);
    var searchLink = `/events_final_country/${value}`
    if (value == "default"){
        createDefault();
    }
    else{
        countryFilteredCharts(searchLink);      
    }
}

// creating the default-option charts. This requires two different data calls due to data structure.
function createDefault(){
    console.log("the two default data pulls")
    defaultOneofTwo ();
    defaultTwoofTwo ();
}

function defaultOneofTwo(){
    var searchLink = "/events_final_country/WLD"
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
        var gdp = [];

        var tbronzes = [];
        var summerTBronzes=[];
        var winterTBronzes=[];

        var tsilvers = [];
        var summerTSilvers = [];
        var winterTSilvers=[];

        var tgolds = [];
        var summerTGolds=[];
        var winterTGolds=[];


        // unpack each variable    
        data.forEach(function(d) {

            var year = d.Year;
            years.push(year);

            var game = d.Chart_Label;
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

            var tbronze = d.Bronze_team;
            tbronzes.push(tbronze);

            var tsilver =d.Silver_team;
            tsilvers.push(tsilver);

            var tgold = d.Gold_team;
            tgolds.push(tgold);

            var season = d.Season;
            if (season == "Summer"){
                summerGames.push(game);
                summerOlympians.push(olympian);
                summerGolds.push(gold);
                summerSilvers.push(silver);
                summerBronzes.push(bronze);
                summerTBronzes.push(tbronze);
                summerTSilvers.push(tsilver);
                summerTGolds.push(tgold);

            }
            else{
                winterGames.push(game);
                winterOlympians.push(olympian);
                winterGolds.push(gold);
                winterSilvers.push(silver);
                winterBronzes.push(bronze);
                winterTBronzes.push(tbronze);
                winterTSilvers.push(tsilver);
                winterTGolds.push(tgold);
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
        var summer_medalist_perc= divideArraysTimesHundred(summerMedals, summerOlympians);

        var perCapitaGdp = divideArrays(gdp, population);

        stackedOlympianBar('summer-olympians', 'Olympians Over Time', summerGames, summerGolds, summerSilvers, summerBronzes, summerNonmedals);
        stackedOlympianBar('winter-olympians', 'Olympians Over Time', winterGames, winterGolds, winterSilvers, winterBronzes, winterNonmedals);
        olympianLine('summer-olympians-perc', '% Medalists Over Time', summerGames, summer_medalist_perc);
        olympianLine('winter-olympians-perc', '% Medalists Over Time', winterGames, winter_medalist_perc);
        medalArea('summer-events', 'Event Medals Over Time', summerGames, summerTGolds, summerTSilvers, summerTBronzes);
        medalArea('winter-events', 'Event Medals Over Time', winterGames, winterTGolds, winterTSilvers, winterTBronzes);
        gdpPopCombo('gdp-combo', years, population, gdp, perCapitaGdp);
    });
}

function defaultTwoofTwo(){
    var searchLink = "/events_final_country/"
    d3.json(searchLink, function(data){
        console.log(data);

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

        // unpack each variable    
        data.forEach(function(d) {

            var olympian = d.No_olympians
            olympians.push(olympian);

            var gold = d.Gold_athlete;
            golds.push(gold);

            var silver = d.Silver_athlete;
            silvers.push(silver);
            
            var bronze = d.Bronze_athlete;
            bronzes.push(bronze);

            var season = d.Season;
            if (season == "Summer"){
                summerOlympians.push(olympian);
                summerGolds.push(gold);
                summerSilvers.push(silver);
                summerBronzes.push(bronze);

            }
            else{
                winterOlympians.push(olympian);
                winterGolds.push(gold);
                winterSilvers.push(silver);
                winterBronzes.push(bronze);
            }

        });

        var medals = [];
        var summerMedals = [];
        var winterMedals = [];
        var nonmedals = [];
        var summerNonmedals = [];
        var winterNonmedals=[];

        for (var i=0; i<olympians.length; i++){
            var medalist = golds[i]+silvers[i]+bronzes[i];
            var nonmedalist = olympians[i]-medalist;
            
            medals.push(medalist);
            nonmedals.push(nonmedalist);
        }
        
        for (var i=0; i<summerOlympians.length; i++){
            var medalist = summerGolds[i]+summerSilvers[i]+summerBronzes[i];
            var nonmedalist = summerOlympians[i]-medalist;
            
            summerMedals.push(medalist);
            summerNonmedals.push(nonmedalist);
        }

        for (var i=0; i<winterOlympians.length; i++){
            var medalist = winterGolds[i]+winterSilvers[i]+winterBronzes[i];
            var nonmedalist = winterOlympians[i]-medalist;
            
            winterMedals.push(medalist);
            winterNonmedals.push(nonmedalist);
        }

        olympianPieBig('olympians-pie1', 'All Time Olympian Medalists (%)',nonmedals, golds, silvers, bronzes);
        olympianPieSmall('olympians-pie2', 'Winter Olympian Medalists (%)', summerNonmedals, summerGolds, summerSilvers, summerBronzes);
        olympianPieSmall('olympians-pie3', 'Summer Olympian Medalists (%)', winterNonmedals, winterGolds, winterSilvers, winterBronzes);


    });
}

// Creating the charts after filter
function countryFilteredCharts(searchLink) {
    d3.json(searchLink, function(data){
        console.log(data);
        var years = [];
        var games = [];
        var summerGames = [];
        var winterGames = [];

        var countries = [];
        var summerCountries = [];
        var winterCountries = [];

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

        
        var tbronzes = [];
        var summerTBronzes=[];
        var winterTBronzes=[];

        var tsilvers = [];
        var summerTSilvers = [];
        var winterTSilvers=[];

        var tgolds = [];
        var summerTGolds=[];
        var winterTGolds=[];

        // unpack each variable    
        data.forEach(function(d) {

            var year = d.Year;
            years.push(year);

            var game = d.Chart_Label;
            games.push(game);

            var country = d.Country;
            countries.push(country);

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

            var tbronze = d.Bronze_team;
            tbronzes.push(tbronze);

            var tsilver =d.Silver_team;
            tsilvers.push(tsilver);

            var tgold = d.Gold_team;
            tgolds.push(tgold);


            var season = d.Season;
            if (season == "Summer"){
                summerGames.push(game);
                summerCountries.push(country);
                summerOlympians.push(olympian);
                summerGolds.push(gold);
                summerSilvers.push(silver);
                summerBronzes.push(bronze);
                summerPopulation.push(pop);
                summerGdp.push(g);
                summerTBronzes.push(tbronze);
                summerTSilvers.push(tsilver);
                summerTGolds.push(tgold);
            }
            else{
                winterGames.push(game);
                winterCountries.push(country);
                winterOlympians.push(olympian);
                winterGolds.push(gold);
                winterSilvers.push(silver);
                winterBronzes.push(bronze);
                winterPopulation.push(pop);
                winterGdp.push(g);
                winterTBronzes.push(tbronze);
                winterTSilvers.push(tsilver);
                winterTGolds.push(tgold);
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
        
        var summer_medalist_perc= divideArraysTimesHundred(summerMedals, summerOlympians);
        var winter_medalist_perc= divideArraysTimesHundred(winterMedals, winterOlympians);

        var perCapitaGdp = divideArrays(gdp, population);

        stackedOlympianBar('summer-olympians', 'Olympians Over Time', summerGames, summerGolds, summerSilvers, summerBronzes, summerNonmedals);
        stackedOlympianBar('winter-olympians', 'Olympians Over Time', winterGames, winterGolds, winterSilvers, winterBronzes, winterNonmedals);
        olympianLine('summer-olympians-perc', '% Medalists Over Time', summerGames, summer_medalist_perc);
        olympianLine('winter-olympians-perc', '% Medalists Over Time', winterGames, winter_medalist_perc);
        medalArea('summer-events', 'Event Medals Over Time', summerGames, summerTGolds, summerTSilvers, summerTBronzes);
        medalArea('winter-events', 'Event Medals Over Time', winterGames, winterTGolds, winterTSilvers, winterTBronzes);
        gdpPopCombo('gdp-combo', years, population, gdp, perCapitaGdp);
        olympianPieBig('olympians-pie1', 'All Time Olympian Medalists (%)',nonmedals, golds, silvers, bronzes);
        olympianPieSmall('olympians-pie2', 'Winter Olympian Medalists (%)', summerNonmedals, summerGolds, summerSilvers, summerBronzes);
        olympianPieSmall('olympians-pie3', 'Summer Olympian Medalists (%)', winterNonmedals, winterGolds, winterSilvers, winterBronzes);
    });

}
// Initialize Website
init();