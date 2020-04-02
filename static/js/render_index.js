// JS for index page.




// countryBar(selectDiv, title, x_axis, countries)

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


// // Currently being used to debug the flask issue.
// d3.json("/events_final_country/USA", function(err, data)
// {
//     console.log("events_final_country/USA");

//     if (err) {
//         console.log("error fetching data");
//         console.warn(err);
//     }

//     console.log(data);
// });

// d3.json("/events_final_country/WLD", function(err, data)
// {
//     console.log("events_final_country/WLD");

//     if (err) {
//         console.log("error fetching data");
//         console.warn(err);
//     }

//     console.log(data);
// });

// d3.json("/events_final_country/", function(err, data)
// {
//     console.log("events_final_country/");
    
    
//     if (err) {
//         console.log("error fetching data");
//         console.warn(err);
//     }

//     console.log(data);
// });

// d3.json("/events_final_games/1976 - Innsbruck", function(err, data)
// {
//     console.log("/events_final_games/1976 - Innsbruck");
    
//     if (err) {
//         console.log("error fetching data");
//         console.warn(err);
//     }

//     console.log(data);
// });

// d3.json("/NOC_Country_list/", function(err, data)
// {
//     console.log("/NOC_Country_list");
    
//     if (err) {
//         console.log("error fetching data");
//         console.warn(err);
//     }
//     console.log(data);
// });

// d3.json("/countries_per_event/", function(err, data)
// {
//     console.log("/countries_per_event/");

//     if (err) {
//         console.log("error fetching data");
//         console.warn(err);
//     }

//     console.log(data);