var PanelData = d3.select("chart4");


team = "USA";

function buildMetadata(team) {
  d3.json(`/olympiansteam/USA`).then((values) => {
      
    // Use `.html("") to clear any existing data
    PanelData.html("");

    // Using `Object.entries` and 'for each' to add 
    //each key and value pair to the PanelData
    //append the fetch data to the h6 element
    
    Object.entries(values).forEach(([key, val]) => {
      PanelData.append("h6").text(`${key}: ${val}`);
      console.log(key,val);
    });

    
  });
}

buildMetadata(team);