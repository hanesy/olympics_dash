Olympics_Data: //this can be all countries or specific countries
{
    eachCountry:
    [

        {
            name: country_name, //example: United States of America, or "summary"
            NOC: country_noc, //example USA or "summary"
            events: //list of objects within an object
                [
                    {  
                        game_label: "Summer 2012 - London", // this is an example
                        game_name: "summer_2012",
                        year: 2012,
                        season: summer,
                        population: 123243,
                        GDP: 121232109,
                        olympians: total_olympians,
                        golds: total_golds,
                        silvers: total_silvers,
                        bronze: total_bronze,
                        //  Shaymus may be able to add additional data here...
                    },
                    {
                        game_label: "Winter 2014 - Sochi", // another example
                        game_name: "winter_2014",
                        year: 2014,
                        season: winter,
                        population: 123243,
                        GDP: 121232109,
                        olympians: total_olympians,
                        golds: total_golds,
                        silvers: total_silvers,
                        bronze: total_bronze,
                        //  Shaymus may be able to add additional data here...
                    },
                    //add more games here
                    {
                        game_label: "", 
                        game_name: "",
                        year: ,
                        season: winter,
                        population: 123243,
                        GDP: 121232109,
                        olympians: total_olympians,
                        golds: total_golds,
                        silvers: total_silvers,
                        bronze: total_bronze,
                        //  Shaymus may be able to add additional data here...
                    }
                ]    
        },
        {
            name:"",
            NOC: "",
            games: 
                [ 
                    {
                        game_label: "", 
                        game_name: "",
                        year: ,
                        season: winter,
                        olympians: total_olympians,
                        golds: total_golds,
                        silvers: total_silvers,
                        bronze: total_bronze,
                        //  Shaymus may be able to add additional data here...
                    },
                    // more games
                ]   
            
        },
        //add more countries
    ],

    summary:
    {
        name:"",
        NOC: "",
        events: 
            [ 
                {
                    game_label: "", 
                    game_name: "",
                    year: ,
                    season: winter,
                    population: 123243,
                    GDP: 121232109,
                    olympians: total_olympians,
                    golds: total_golds,
                    silvers: total_silvers,
                    bronze: total_bronze,
                },
                // more events
            ]  
    }
}

