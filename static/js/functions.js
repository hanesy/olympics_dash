
// array transformation functions
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

function scatterMatchArrays(perCap, medals, countries, games){
    var finalArray = [];

    for (var i = 0; i<perCap.length; i++){
        
        if (countries[i] == "World") {

        }
        else if (perCap[i] > 0)
        {
            var x =+ perCap[i];
            var y =+ medals[i];
            var scatterPoint = {
                "name": games[i] + " <br>Country: " + countries[i],
                "x": x,
                "y": y
            }
            finalArray.push(scatterPoint);

        }

    }
    return finalArray;
}

// creating dropdown functions
function createDropDownCountry(selectDiv, arrayName, arrayNoc){
    var dropDown = d3.select (selectDiv);
    dropDown.append("option").attr("value", "default").text("Select Options");
    for (var i = 0; i < arrayName.length; i++) {
      dropDown.append("option").attr("value", arrayNoc[i]).text(arrayName[i]);
    }
}

function createDropDownEvent(selectDiv, arrayName, arrayNoc){
    var dropDown = d3.select (selectDiv);
    dropDown.append("option").attr("value", "all").text("All Events");
    for (var i = 0; i < arrayName.length; i++) {
      dropDown.append("option").attr("value", arrayNoc[i]).text(arrayName[i]);
    }
}