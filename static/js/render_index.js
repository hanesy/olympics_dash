// JS for index page.


// Currently being used to debug the flask issue.
d3.json("/events_final_country/USA", function(err, data)
{
    console.log("events_final_country/USA");

    if (err) {
        console.log("error fetching data");
        console.warn(err);
    }

    console.log(data);
});

d3.json("/events_final_country/WLD", function(err, data)
{
    console.log("events_final_country/WLD");

    if (err) {
        console.log("error fetching data");
        console.warn(err);
    }

    console.log(data);
});

d3.json("/events_final_country/", function(err, data)
{
    console.log("events_final_country/");
    
    
    if (err) {
        console.log("error fetching data");
        console.warn(err);
    }

    console.log(data);
});

d3.json("/events_final_games/1976 - Innsbruck", function(err, data)
{
    console.log("/events_final_games/1976 - Innsbruck");
    
    if (err) {
        console.log("error fetching data");
        console.warn(err);
    }

    console.log(data);
});

d3.json("/NOC_Country_list/", function(err, data)
{
    console.log("/NOC_Country_list");
    
    if (err) {
        console.log("error fetching data");
        console.warn(err);
    }
    console.log(data);
});

d3.json("/countries_per_event/", function(err, data)
{
    console.log("/countries_per_event/");

    if (err) {
        console.log("error fetching data");
        console.warn(err);
    }

    console.log(data);
});