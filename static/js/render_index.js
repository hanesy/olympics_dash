// JS for index page.


// Currently being used to debug the flask issue.
d3.json("/events_final_country/USA", function(data)
{
    console.log("events_final_country/USA");
    console.log(data);
});

d3.json("/events_final_country/WLD", function(data)
{
    console.log("events_final_country/WLD");
    console.log(data);
});

d3.json("/events_final_country/", function(data)
{
    console.log("events_final_country/");
    console.log(data);
});

d3.json("/events_final_games/1976 - Innsbruck", function(data)
{
    console.log("/events_final_games/1976 - Innsbruck");
    console.log(data);
});

d3.json("/NOC_Country_list/", function(data)
{
    console.log("/NOC_Country_list");
    console.log(data);
});

d3.json("/countries_per_event/", function(data)
{
    console.log("/countries_per_event/");
    console.log(data);
});