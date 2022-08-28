// SAM VUONG week 16 homework
// most of cose taken from activity 12 week 16 day 3
// doing a scatter plot between Smokers vs. Age

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


// function used for updating x-scale var upon click on axis label
function xScale(csvData) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(csvData, d => d.poverty) * 0.95,
        d3.max(csvData, d => d.poverty) * 1.05
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  }

  // function used for updating xAxis var upon click on axis label
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }


  // function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newXScale) {

    circlesGroup.transition()
      .duration(1000)
     // .attr("cx", d => newXScale(d.poverty));
  
    return circlesGroup;
  }

    // function used for updating circles group with a transition to
// new circles
function renderCirclesText(circlesText, newXScale) {

    circlesText.transition()
      .duration(1000)
     // .attr("x", d => newXScale(d.poverty));
  
    return circlesText;
  }

// Retrieve data from the CSV file and execute everything below
d3.csv("assets/data/data.csv").then(function(csvData, err) {
    if (err) throw err;
    
   
    // amend data, change int values from str to int 
    // doing a scatter plot between Smokers vs. Age
    csvData.forEach(data => {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        console.log(data.abbr)
    });

   

    //<div id="scatter">

    // xLinearScale function above csv import
    var xLinearScale = xScale(csvData);
    console.log(xLinearScale)

     // Create y scale function
    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(csvData, d => d.healthcare) * 0.95, d3.max(csvData, d => d.healthcare) * 1.05])
    .range([height, 0]);
    console.log(yLinearScale);

    // Create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x axis
    var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    // append y axis
    chartGroup.append("g")
    .call(leftAxis);

      // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
    .data(csvData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 15)
    .attr("fill", "red")
    .attr("opacity", ".71");

    // ok i don't know why, but when i select a non existant tag, it will print all states
    // if i select "text" / a tag that does actually exist, it will only print half the states...  
    var circlesText = chartGroup.selectAll("random")
    .data(csvData)
    .enter()
    .append("text")
    .attr("x", d => (xLinearScale(d.poverty)-12))
    .attr("y", d => (yLinearScale(d.healthcare) + 5))
    .attr("font-size", 15)
    .attr("font-weight",900)
    .text(d => d.abbr);

      // Create group for two x-axis labels
    var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var ageLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    //.attr("value", "hair_length") // value to grab for event listener
    //.classed("active", true)
    .text("In Poverty %");

        // append y axis
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (svgHeight / 2) - margin.top)
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare %");


       // functions here found above csv import
        // updates x scale for new data
    xLinearScale = xScale(csvData);
        // updates x axis with transition
    xAxis = renderAxes(xLinearScale, xAxis);
        // updates circles with new x values
  //  circlesText = renderCirclesText(circlesText, xLinearScale);
  //  circlesGroup = renderCircles(circlesGroup, xLinearScale);
    






});