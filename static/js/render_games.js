// Initialize Function -- runs at the end of JS
function init()
{
    var events = [];
    var initEventsLink = '/events_final_country/'

    d3.json(initEventsLink, function(data)
    {
        data.forEach(function(d) {
            var event = d.Game_Label;
            if (events.includes(event)==false)
            {
                events.push(event);
            }
        })
        createDropDownEvent("#selEvent", events, events);

        // create the first view
        var latestEvent = events[events.length-1];
        var firstView = `/events_final_games/${latestEvent}`
        eventFilteredCharts(firstView);
        d3.select("#selEvent").property("value", latestEvent);
    });

};

// Handle Option Changes
function eventChanged(value){
    console.log(`event has changed to ${value}`);
    var searchLink = `/events_final_games/${value}`;

    if (value == "all"){
        createAllView();
    }
    else{
        eventFilteredCharts(searchLink);           
    }
}

// Create a view for all countries and games
function createAllView(){
    var searchLink = "/events_final_country/"
    d3.json(searchLink, function(data){
        console.log(data);

        var countries = [];
        var summerCountries = [];
        var winterCountries = [];

        var games = [];
        var summerGames = [];
        var winterGames = [];

        var population = [];
        var summerPopulation = [];
        var winterPopulation = [];

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

        var gdp = [];
        var summerGdp = [];
        var winterGdp = [];


        // unpack each variable    
        data.forEach(function(d) {

            var country = d.Country;


            if (country == "World"){

            }
            else {
            countries.push(country);

            var olympian = d.No_olympians
            olympians.push(olympian);

            var game = d.Game_Label;
            games.push(game);

            var pop = d.Population;
            population.push(pop);

            var gold = d.Gold_athlete;
            golds.push(gold);

            var silver = d.Silver_athlete;
            silvers.push(silver);
            
            var bronze = d.Bronze_athlete;
            bronzes.push(bronze);

            var g = d.GDP;
            gdp.push(g);

            var season = d.Season;
            if (season == "Summer"){
                summerCountries.push(country);
                summerOlympians.push(olympian);
                summerGames.push(game);
                summerPopulation.push(pop);
                summerGolds.push(gold);
                summerSilvers.push(silver);
                summerBronzes.push(bronze);
                summerGdp.push(g);
            }
            else{
                winterCountries.push(country);
                winterOlympians.push(olympian);
                winterGames.push(game);
                winterPopulation.push(pop);
                winterGolds.push(gold);
                winterSilvers.push(silver);
                winterBronzes.push(bronze);
                winterGdp.push(g);
            }

        
        }
        });
        

        var medals = [];
        var summerMedals = [];
        var winterMedals = [];
        var nonmedals = [];
        var summerNonmedals = [];
        var winterNonmedals=[];

        for (var i=0; i<countries.length; i++){
            var medalist = golds[i]+silvers[i]+bronzes[i];
            var nonmedalist = olympians[i]-medalist;
            
            medals.push(medalist);
            nonmedals.push(nonmedalist);
        }
        
        for (var i=0; i<summerCountries.length; i++){
            var medalist = summerGolds[i]+summerSilvers[i]+summerBronzes[i];
            var nonmedalist = summerOlympians[i]-medalist;
            
            summerMedals.push(medalist);
            summerNonmedals.push(nonmedalist);
        }

        for (var i=0; i<winterCountries.length; i++){
            var medalist = winterGolds[i]+winterSilvers[i]+winterBronzes[i];
            var nonmedalist = winterOlympians[i]-medalist;
            
            winterMedals.push(medalist);
            winterNonmedals.push(nonmedalist);
        }
    
        medalScatter('scatter-gdp', 'GDP and Olympian Medal Count', 'GDP', winterGdp, winterMedals, winterCountries, winterGames, summerGdp, summerMedals, summerCountries, summerGames);
        medalScatter('scatter-pop', 'Population and Olympian Medal Count', 'Population', winterPopulation, winterMedals, winterCountries, winterGames, summerPopulation, summerMedals, summerCountries, summerGames);
        olympianMedalBar('medalist-bar');
        stackedEventBar('events-country');
        stackedOlympianBar('olympians-country');
    });
}

// Creating the charts for each of the two filters
function eventFilteredCharts(searchLink) {
    d3.json(searchLink, function(data){
        console.log(data);
        var years = [];
        var games = [];
        var summerGames=[];
        var winterGames=[];

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

            var country = d.Country;

            if (country == "World"){

            }
            else {
            var year = d.Year;
            years.push(year);

            var game = d.Game_Label;
            games.push(game);

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
        
        var medalist_perc= divideArraysTimesHundred(medals, olympians);

        stackedOlympianHorBar('olympians-country', 'Olympians by Country', countries, golds, silvers, bronzes, nonmedals);
        olympianMedalBar('medalist-bar', '% Medalist by Country', countries, medalist_perc);
        stackedEventBar('events-country', 'Event Medals by Country', countries, tgolds, tsilvers, tbronzes);
        medalScatter('scatter-gdp', 'GDP and Medal Count', 'GDP', winterGdp, winterMedals, winterCountries, winterGames, summerGdp, summerMedals, summerCountries, summerGames);
        medalScatter('scatter-pop', 'Population and Medal Count', 'Population', winterPopulation, winterMedals, winterCountries, winterGames, summerPopulation, summerMedals, summerCountries, summerGames);
       
        
    });
}

// Initialize Website
init();