// Olympic Map

let ajax_progress;
let current_country = '';

let filter_year = "";
// let filter_season = "";

// Create function for year change
function changeYear(element) {
    filter_year = element.value;
}
// Create function for season (winter or summer)
// function changeSeason(element) {
//     filter_season = element.value;
// }

$(document).ready(function(){
    console.log(medal_data);

    ajax_progress = null;

    var popup = L.popup({closeButton: false});

    var bounds = new L.LatLngBounds(new L.LatLng(85, -180), new L.LatLng(-85, 180));
    var map = L.map('map', 
    {
        maxBounds: bounds,
        maxBoundsViscosity: 1.0
    })
    // Mouse over to popup country stats
    .on('mousemove', (e) => {
    let latlng = e.latlng;
    if (!ajax_progress) {
        ajax_progress = $.ajax({
            url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + e.latlng.lat + ',' + e.latlng.lng + '&sensor=true&key=AIzaSyCVsbH_wdEgmvtsD_-9Ai0IhrA54vC0Bzw',
            type: "GET",
            cache: false,
            beforeSend: function () {
            },
            success: function (data) {
            let country = '';
            if (data.results.length != 0) {
                let address = data.results[0].address_components;
                for (let i = 0;i < address.length;i ++) {
                if (address[i].types.includes("country")) {
                    country = address[i].long_name;
                    break;
                }
                }
            }
            if (country == '') {
                $('.leaflet-popup').css('display', 'none'); 
            }
            else {
                $('.leaflet-popup').css('display', 'block');  
            }
            if (current_country != country) {
                map.eachLayer(function (layer) {
                if (layer.feature != undefined) {
                    map.removeLayer(layer); 
                }
                });
                current_country = country;
                popup.setContent('<strong>' + current_country + '</strong>')
                .openOn(map);

                if (current_country != '') {
                var found = countries.features.find(function(element) {
                    var cs = element.id.substr(0, 2);
                    if (element.properties.name.includes(current_country)) {
                    return element;
                    }
                });
                if (found != undefined) {
                    let geoPolygon = {"type":"FeatureCollection","features":[found]};
                    L.geoJson( geoPolygon ).addTo(map);

                    let bronze = 0;
                    let gold = 0;
                    // let no_medal = 0;
                    let silver = 0;
                    let total = 0;

                    for( var key in medal_data.NOC ) {
                    if (medal_data.NOC[key] == found.id) {
                        if (filter_year != "" && filter_year != medal_data.Game_Label[key]) {
                        continue;
                        }

                        bronze += medal_data.Bronze_team[key];
                        gold += medal_data.Gold_team[key];
                        // no_medal += medal_data.No_medal[key];
                        silver += medal_data.Silver_team[key];
                        total += medal_data.Total_Medals_team[key];
                    }
                    }

                    popup.setContent('<strong style="font-size:14px;">' + current_country +
                                     '</strong><br><strong>Gold Medal: </strong>' + gold + 
                                     '<br><strong>Silver Medal: </strong>' + silver + 
                                     '<br><strong>Bronze Medal: </strong>' + bronze + 
                                    //  '<br><strong>No Medal: </strong>' + no_medal +
                                     '<br><strong>Total Medals: </strong>' + total);
                }
                }
                
            }
            ajax_progress = null;
            },
            error: function (data) {
            ajax_progress = null;
            }
        });
    }

    popup.setLatLng(latlng);
    })
    .setView([42.35, -71.08], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 17,
        minZoom: 3
    }).addTo(map);

    });