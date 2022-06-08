// JavaScript source code

var rowConverterStates = function(d) {
	return {
		Coal: parseFloat(d.Coal),
		Oil: parseFloat(d.Oil),
		Gas: parseFloat(d.Gas),
		Renewables: parseFloat(d.Renewables)
	};
}

onload = function init() {
	d3.csv("../DV_Website/data/ausStack.csv", rowConverterStates).then(function (data) { stackChartState(data) });
}

function stackChartState(dataset) {

	var margin = { top: 10, right: 25, bottom: 50, left: 50 },
		width = 600 - margin.left - margin.right, height = 600 - margin.top - margin.bottom; //plot size, will keep plot within bounds of chart area

	//create draw space
	var svg = d3.select("#plot")
		.append("svg")
		.attr("width", width + margin.left + margin.right) //add back margins to get actual svg size
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	//grab headers excluding column 1
	var stack = d3.stack()
		.keys(["Coal", "Oil", "Gas", "Renewables"]);

	var series = stack(dataset);

	//set up scales
	var xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, width])
		.paddingInner(0.2);

	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) {
			return d.Coal + d.Oil + d.Gas + d.Renewables;
		})])
		.range([height, 0]);

	//chart colours
	var colours = d3.scaleOrdinal()
		.domain(series)
		.range(["SaddleBrown", "Black", "Indigo", "LawnGreen"]);

	//draw bars
	svg.append("g")
		.selectAll("g")
		.data(series)
		.enter().append("g")
		.attr("fill", function (d) { return colours(d.key); })
		.selectAll("rect")
		.data(function (d) { return d; })
		.enter().append("rect")
		.attr("x", function (d, i) { return xScale(i); })
		.attr("y", function (d) { return yScale(d[1]); })
		.attr("height", function (d) { return yScale(d[0]) - yScale(d[1]); })
		.attr("width", xScale.bandwidth());

	//add x axis to plot
	svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xScale).tickSizeOuter(0));

	//add y axis
	svg.append("g")
		.call(d3.axisLeft(yScale))
		.attr("id", "lAxis");

	//click buttons to update chart
	d3.select("#aus")
		.on("click", function () {
			d3.csv("../DV_Website/data/ausStack.csv", rowConverterStates).then(function (data) { updateState(data); });
		});

	d3.select("#vic")
		.on("click", function () {
			d3.csv("../DV_Website/data/vicStack.csv", rowConverterStates).then(function (data) { updateState(data); });
		});

	d3.select("#nsw")
		.on("click", function () {
			d3.csv("../DV_Website/data/nswStack.csv", rowConverterStates).then(function (data) { updateState(data); });
		});

	d3.select("#wa")
		.on("click", function () {
			d3.csv("../DV_Website/data/waStack.csv", rowConverterStates).then(function (data) { updateState(data); });
		});

	d3.select("#tas")
		.on("click", function () {
			d3.csv("../DV_Website/data/tasStack.csv", rowConverterStates).then(function (data) { updateState(data); });
		});

	d3.select("#sa")
		.on("click", function () {
			d3.csv("../DV_Website/data/saStack.csv", rowConverterStates).then(function (data) { updateState(data); });
		});

	d3.select("#nt")
		.on("click", function () {
			d3.csv("../DV_Website/data/ntStack.csv", rowConverterStates).then(function (data) { updateState(data); });
		});

	d3.select("#qld")
		.on("click", function () {
			d3.csv("../DV_Website/data/qldStack.csv", rowConverterStates).then(function (data) { updateState(data); });
		});
}

function updateState(dataset) {

	var margin = { top: 10, right: 25, bottom: 50, left: 50 },
		height = 600 - margin.top - margin.bottom;

	var stack = d3.stack()
		.keys(["Coal", "Oil", "Gas", "Renewables"]);

	var series = stack(dataset);

	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) {
			return d.Coal + d.Oil + d.Gas + d.Renewables;
		})])
		.range([height, 0]);

	d3.select("svg").selectAll("g")
		.selectAll("rect")
		.data(series)
		.attr("y", function (d) { return yScale(d[1]); })
		.attr("height", function (d) {
			return yScale(d[0]) - yScale(d[1]);
		});

	d3.select("svg").select("#lAxis")
		.transition()
		.duration(2000)
		.call(d3.axisLeft(yScale));
}

