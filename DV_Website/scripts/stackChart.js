// JavaScript source code

onload = function init() {
    data = d3.json("../data/stackData.json");

    stackChart(data.STACK.AUS);
}

function stackChart(dataset) {

    var width = 600, height = 600;

    var stack = d3.stack()
        .keys(["Coal", "Oil", "Gas", "Renewables"]);

    var series = stack(dataset);


}