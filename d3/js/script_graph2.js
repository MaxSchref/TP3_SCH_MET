function DrawAll(){
d3.json("Data/meteo.json", function(error, data) {
   var sel = document.getElementById('selectDay').value-1;
   NewOptions(data, sel);
   var sel2 = document.getElementById('selectStation').value;
   var donnees = data[sel].station[sel2].hours;
   name = data[sel].station[sel2].n;
   day = sel+1;
   DrawGraph3(donnees);
   DrawGraph4(donnees);
});
}

function NewOptions(data, sel){
for(var i=0; i<data[sel].station.length; i++){
	var select = document.getElementById('selectStation');

	// create new option element
	var opt = document.createElement('option');

	// create text node to add to option element (opt)
	opt.appendChild( document.createTextNode('' + data[sel].station[i].n + '') );

	// set value property of opt
	opt.value = '' + i + '';

	// add opt to end of select box (sel)
	select.appendChild(opt);
}
}

var barcolor1 = "#E03709";
var	barcolor2 = "#06608A";

function DrawGraph3(data){

	div = d3.select("body").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);

	svg = d3.select("#GraphTemp2"),
	margin = 200,
	width = svg.attr("width") - margin,
	height = svg.attr("height") - margin
    svg.selectAll("*").remove();

    svg.append("text")
       .attr("transform", "translate(50,0)")
       .attr("x", 0)
       .attr("y", 50)
       .attr("font-size", "15px")
       .attr("font-family", "Verdana")
       .text("Evolution de la temperature pour le " + day + " fevrier à " + name)

    xScale = d3.scaleBand().range([0, width]).padding(0.4);
    yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");
	xScale.domain(data.map(function(d) { return d.h; }));
	yScale.domain([0, d3.max(data, function(d) { return d.t/100; })]);

	g.append("g")
	 .attr("transform", "translate(0," + height + ")")
	 .call(d3.axisBottom(xScale))
	 .append("text")
	 .attr("y", height - 250)
	 .attr("x", width - 100)
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("Heure");

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
	 .attr("x", function(d) { return xScale(d.h); })
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

function DrawGraph4(data){

	div2 = d3.select("body").append("div")
     .attr("class", "tooltip")
     .style("opacity", 0);

	svg = d3.select("#GraphPrecip2"),
	margin = 200,
	width = svg.attr("width") - margin,
	height = svg.attr("height") - margin
    svg.selectAll("*").remove();

    svg.append("text")
       .attr("transform", "translate(50,0)")
       .attr("x", 0)
       .attr("y", 50)
       .attr("font-size", "15px")
			 .attr("font-family", "Verdana")
       .text("Evolution des precipitations pour le " + day + " fevrier à " + name)

    xScale = d3.scaleBand().range([0, width]).padding(0.4);
    yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");
	xScale.domain(data.map(function(d) { return d.h; }));
	yScale.domain([0, d3.max(data, function(d) { return d.p; })]);

	g.append("g")
	 .attr("transform", "translate(0," + height + ")")
	 .call(d3.axisBottom(xScale))
	 .append("text")
	 .attr("y", height - 250)
	 .attr("x", width - 100)
	 .attr("text-anchor", "end")
	 .attr("stroke", "black")
	 .text("Heure");

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
	 .attr("x", function(d) { return xScale(d.h); })
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
