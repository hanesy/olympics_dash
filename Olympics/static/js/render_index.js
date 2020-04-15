// JS for index page.

// see olympic_map.js for loading the map

function init () {
    d3.json("/countries_per_event/", function(data){
        console.log(data);
        var games = [];
        var countries_count = [];

        // unpack each variable    
        data.forEach(function(d) {

            var game = d.Game_Label;
            games.push(game);
            var country_count = d.Total_Countries;
            countries_count.push(country_count);
        });;

    countryBar("countries", "Participating Countries by Game", games, countries_count);

   });
}

init();
