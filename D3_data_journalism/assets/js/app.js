// @TODO: YOUR CODE HERE!

d3.csv("assets/data/data.csv").then(function(csvData) {

    // amend data, change int values from str to int 
    csvData.forEach(data => {
        data.age = +data.age;
        console.log(data.abbr);
        console.log(data.age);
    })


});