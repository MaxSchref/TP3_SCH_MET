d3.json("Data/meteo.json", function(error, data) {
	if (error)throw error;
	DrawGraph1(data);
	DrawGraph2(data);
});

var barcolor1 = "#E03709";
var	barcolor2 = "#06608A";

function DrawGraph1(data){

	div = d3.select("body").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);

	svg = d3.select("#GraphTemp"),
	margin = 200,
	width = svg.attr("width") - margin,
	height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(50,0)")
       .attr("x", 0)
       .attr("y", 50)
       .attr("font-size", "20px")
			 .attr("font-family", "Verdana")
       .text("Évolution de la température pour le mois de Février")

    xScale = d3.scaleBand().range([0, width]).padding(0.4);
    yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");
	xScale.domain(data.map(function(d) { return d.d; }));
	yScale.domain([0, d3.max(data, function(d) { return d.t/100; })]);

	g.append("g")
	 .attr("transform", "translate(0," + height + ")")
	 .call(d3.axisBottom(xScale))
	 .append("text")
	 .attr("y", height - 250)
	 .attr("x", width - 100)
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("Jours du mois");

	g.append("g")
	 .call(d3.axisLeft(yScale))
	 .append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 6)
	 .attr("dy", "-5.1em")
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("Temperature (°C)");

	g.selectAll(".bar")
	 .data(data)
	 .enter().append("rect")
	 .attr("class", "bar")
	 .attr("x", function(d) { return xScale(d.d); })
	 .attr("y", function(d) { return yScale(d.t/100); })
	 .attr("width", xScale.bandwidth())
	 .attr("fill", function(d){return barcolor1})
	 .attr("height", function(d) { return height - yScale(d.t/100); })
	 .on("mouseover", function(d) {
		d3.select(this).attr("fill", barcolor2);
		div.transition()
		 .duration(50)
	     .style("opacity", 1);
		div.html(d.t/100)
		 .style("left", (d3.event.pageX + 10) + "px")
		 .style("top", (d3.event.pageY - 15) + "px");})
	 .on("mouseout", function(d) { d3.select(this).attr("fill", barcolor1);
		div.transition()
		.duration('50')
		.style("opacity", 0);
	 });
};

function DrawGraph2(data){

	div2 = d3.select("body").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);

	svg = d3.select("#GraphPrecip"),
	margin = 200,
	width = svg.attr("width") - margin,
	height = svg.attr("height") - margin

    svg.append("text")
       .attr("transform", "translate(50,0)")
       .attr("x", 0)
       .attr("y", 50)
       .attr("font-size", "20px")
			 .attr("font-family", "Verdana")
       .text("Évolution des précipitations pour le mois de Février")

    xScale = d3.scaleBand().range([0, width]).padding(0.4);
    yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");
	xScale.domain(data.map(function(d) { return d.d; }));
	yScale.domain([0, d3.max(data, function(d) { return d.p; })]);

	g.append("g")
	 .attr("transform", "translate(0," + height + ")")
	 .call(d3.axisBottom(xScale))
	 .append("text")
	 .attr("y", height - 250)
	 .attr("x", width - 100)
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("Jours du mois");

	g.append("g")
	 .call(d3.axisLeft(yScale))
	 .append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 6)
	 .attr("dy", "-5.1em")
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("Precipitation (mm)");

	g.selectAll(".bar")
	 .data(data)
	 .enter().append("rect")
	 .attr("class", "bar")
	 .attr("x", function(d) { return xScale(d.d); })
	 .attr("y", function(d) { return yScale(d.p); })
	 .attr("width", xScale.bandwidth())
	 .attr("fill", function(d){return barcolor2})
	 .attr("height", function(d) { return height - yScale(d.p); })
	 .on("mouseover", function(d) { d3.select(this).attr("fill", barcolor1);
	 		div2.transition()
		 .duration(50)
	     .style("opacity", 1);
		div2.html(d.p)
		 .style("left", (d3.event.pageX + 10) + "px")
		 .style("top", (d3.event.pageY - 15) + "px");})
	 .on("mouseout", function(d, i) { d3.select(this).attr("fill", barcolor2);
	 		div2.transition()
		.duration('50')
		.style("opacity", 0);
});
};
