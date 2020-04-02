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
        createDropDown("#selEvent", events, events);
    });

    createDefault();
};

// Handle Option Changes
function eventChanged(value){
    console.log(`event has changed to ${value}`);
    var searchLink = `/events_final_games/${value}`;

    if (value == "default"){
        createDefault();
    }
    else{
        eventFilteredCharts(searchLink);           
    }

    console.log(`event has changed to ${value}`);
    var searchLink = `/events_final_games/${value}`;
    d3.select("#selCountry").property("value", "default");
}


// creating the default-option charts. This requires two different data calls due to data structure.
function createDefault(){
    console.log("the two default data pulls")
    defaultOne ();
}

function defaultOne(){
    var searchLink = "/events_final_country/"
    d3.json(searchLink, function(data){
        console.log(data);

        var countries = [];
        var summerCountries = [];
        var winterCountries = [];

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
                summerGolds.push(gold);
                summerSilvers.push(silver);
                summerBronzes.push(bronze);
                summerGdp.push(g);
            }
            else{
                winterCountries.push(country);
                winterOlympians.push(olympian);
                winterGames.push(game);
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
    

        stackedOlympianBar('olympians-country', 'Olympians by Country');
        olympianMedalBar('medalist-bar', '% Medalist by Country');
        stackedEventBar('events-country', 'Event Medals by Country');
        gdpCapMedalScatter('scatter', 'GDP and Medal Count', winterGdp, winterMedals, winterCountries, winterGames, summerGdp, summerMedals, summerCountries, summerGames);
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

        stackedOlympianBar('olympians-country', 'Olympians by Country', countries, golds, silvers, bronzes, nonmedals);
        olympianMedalBar('medalist-bar', '% Medalist by Country', countries, medalist_perc);
        stackedEventBar('events-country', 'Event Medals by Country', countries, tgolds, tsilvers, tbronzes);
        gdpCapMedalScatter('scatter', 'GDP and Medal Count',winterGdp, winterMedals, winterCountries, winterGames, summerGdp, summerMedals, summerCountries, summerGames);
    });
}


// Initialize Website
init();