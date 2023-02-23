// Set constants for frame and vis dimensions (height and width) and margins
const FRAME_HEIGHT = 700;
const FRAME_WIDTH = 700;
const MARGINS = {left: 75, right: 75, top: 75, bottom: 75};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.bottom;

// OPACITY MIGHT NOT WORKING??
// Create frame1
const FRAME1 = d3.select("#vis1")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

// Function that creates a scatter plot 
function lengthScatter() {
	// Reading from scatter plot file
	d3.csv("data/iris.csv").then((data) => {

		// Find max of y 
		const MAX_Y = d3.max(data, (d) => {
			return parseInt(d.Petal_Length);
		}); 

		// Scale function for y 
		const Y_SCALE = d3.scaleLinear()
							.domain([0, (MAX_Y + 1)])
							.range([VIS_HEIGHT, 0]);

		// Find max of x 
		const MAX_X = d3.max(data, (d) => {
			return parseInt(d.Sepal_Length);
		});

		// Scale function for x
		const X_SCALE = d3.scaleLinear()
							.domain([0, (MAX_X + 1)])
							.range([0, VIS_WIDTH]);

		// Title the scatter plot
        FRAME1.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", MARGINS.top - 25)
	        .attr("text-anchor", "middle")
	        .attr("font-weight", "700")
	        .style("font-size", "18px")
	        .text("Petal_Length vs. Sepal_Length");
        
	    // Add tick marks for x axis
		FRAME1.append("g")
			.attr("transform", 
				"translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.bottom) + ")")
			.call(d3.axisBottom(X_SCALE).ticks(8))
				.attr("font-size", "10px");
		
		// Add tick marks for y axis 
		FRAME1.append("g")
			.attr("transform", 
				"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
			.call(d3.axisLeft(Y_SCALE).ticks(14))
				.attr("font-size", "10px");

		const color = d3.scaleOrdinal()
		    .domain(["setosa", "versicolor", "virginica" ])
		    .range([ "#00FF00", "#FFA500", "#87CEFA"])

		// Plot scatter plot
        const circle1 = FRAME1.append("g")
	        .selectAll("dot")
	        // Loop through all the data from the dataset and append them as a circle
	        .data(data)
	        .enter()
	        .append("circle")
	        .attr("cx", (d) => { return X_SCALE(d.Sepal_Length) + MARGINS.left; })
			.attr("cy", (d) => { return Y_SCALE(d.Petal_Length) + MARGINS.top; })
			.attr("fill", (d) => { return color(d.Species); })
	        .attr("r", 5)
	        .attr("stroke", "none")
	        .style("opacity", 0.5)
	        .attr("class", "point");
	});
}
// Call the length scatter plot function to plot data points
lengthScatter();


// OPACITY MIGHT NOT WORKING??
// Create frame2
const FRAME2 = d3.select("#vis2")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

// Function that creates a scatter plot 
function widthScatter() {
	// Reading from scatter plot file
	d3.csv("data/iris.csv").then((data) => {

		// Find max of y 
		const MAX_Y = d3.max(data, (d) => {
			return parseInt(d.Petal_Width);
		}); 

		// Scale function for y 
		const Y_SCALE = d3.scaleLinear()
							.domain([0, (MAX_Y + 1)])
							.range([VIS_HEIGHT, 0]);

		// Find max of x 
		const MAX_X = d3.max(data, (d) => {
			return parseInt(d.Petal_Length);
		});

		// Scale function for x
		const X_SCALE = d3.scaleLinear()
							.domain([0, (MAX_X-1)])
							.range([0, VIS_WIDTH]);

		// Title the scatter plot
        FRAME2.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", MARGINS.top - 25)
	        .attr("text-anchor", "middle")
	        .attr("font-weight", "700")
	        .style("font-size", "18px")
	        .text("Petal_Length vs. Sepal_Length");
        
	    // Add tick marks for x axis
		FRAME2.append("g")
			.attr("transform", 
				"translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.bottom) + ")")
			.call(d3.axisBottom(X_SCALE).ticks(8))
				.attr("font-size", "10px");
		
		// Add tick marks for y axis 
		FRAME2.append("g")
			.attr("transform", 
				"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
			.call(d3.axisLeft(Y_SCALE).ticks(14))
				.attr("font-size", "10px");

		const color = d3.scaleOrdinal()
			.domain(["virginica", "versicolor", "setosa"])
		    .range([ "#87CEFA", "#FFA500", "#00FF00" ])

		// Plot scatter plot
        const circle2 = FRAME2.append("g")
	        .selectAll("dot")
	        // Loop through all the data from the dataset and append them as a circle
	        .data(data)
	        .enter()
	        .append("circle")
	        .attr("cx", (d) => { return X_SCALE(d.Sepal_Width) + MARGINS.left; })
			.attr("cy", (d) => { return Y_SCALE(d.Petal_Width) + MARGINS.top; })
			.attr("fill", (d) => { return color(d.Species); })
	        .attr("r", 5)
	        .attr("stroke", "none")
	        .style("opacity", 0.5)
	        .attr("class", "point");

	    // Add brushing
	 	 FRAME2
		  // Add the brush feature using the d3.brush function
		    .call( d3.brush()   
		    // initialise the brush area: start at 0,0 and finishes at width,height            
		      .extent( [ [0,0], [VIS_WIDTH,VIS_HEIGHT] ] ) 
		      .on("start brush", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function
		    )


		  // Function that is triggered when brushing is performed
		  function updateChart() {
		    extent = d3.event.selection
		    circle2.classed("selected", function(d){ return isBrushed(extent, x(d.Sepal_Width), y(d.Petal_Width) ) } )
		  }

		  // A function that return TRUE or FALSE according if a dot is in the selection or not
		  function isBrushed(brush_coords, cx, cy) {
		       let x0 = brush_coords[0][0],
		           x1 = brush_coords[1][0],
		           y0 = brush_coords[0][1],
		           y1 = brush_coords[1][1];
		      // This return TRUE or FALSE depending on if the points is in the selected area
		      return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    
		  }

	});
}
// Call the width scatter plot function to plot data points
widthScatter();


// OPACITY MIGHT NOT WORKING??
// Create frame3
const FRAME3 = d3.select("#vis3")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

// Function that plots a bar chart with tooltip 
function barChart() {
	// Reading from the bar chart file
	d3.csv("data/iris.csv").then((data) => {

		// Title
        FRAME3.append("text")
	        .attr("x", MARGINS.left + VIS_WIDTH/2)
	        .attr("y", MARGINS.top - 25)
	        .attr("text-anchor", "middle")
	        .attr("font-weight", "700")
	        .style("font-size", "18px")
	        .text("Count of Species");
   
	    // Add X axis and x ticks 
		const x = d3.scaleBand()
	  		.range([0, VIS_WIDTH])
			.domain(data.map((d) => { return d.Species; }))
			.padding(0.2);
		FRAME3.append("g")
			.attr("transform", "translate(" + MARGINS.left + ", " + (VIS_HEIGHT + MARGINS.top) + ")")
		  	.call(d3.axisBottom(x))
		  	.selectAll("text")
		    .attr("transform", "translate(-10,0)rotate(-45)")
		    .style("text-anchor", "end");

		// Find max of y 
		const MAX_Y = 50;

		// Add Y axis
		const y = d3.scaleLinear()
		  .domain([0, (MAX_Y)])
		  .range([VIS_HEIGHT, 0]);
		FRAME3.append("g")
			.attr("transform", 
					"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
		  	.call(d3.axisLeft(y).ticks(6))
		  	.attr("font-size", "10px");

		const color = d3.scaleOrdinal()
			.domain(["virginica", "versicolor", "setosa"])
		    .range([ "#87CEFA", "#FFA500", "#00FF00" ])

		// Plot barchart
		FRAME3.selectAll("bars")
			// Loop through all the data from the dataset and append them as rectangles
		  	.data(data)
		  	.enter()
		  	.append("rect")
		    	.attr("x", (d) => { return x(d.Species) + MARGINS.left; })
		    	.attr("y", (d) => { return MARGINS.bottom; })
			    .attr("width", x.bandwidth())
			    .attr("height", (d) => { return VIS_HEIGHT - y(50); })
			    .attr("fill", (d) => { return color(d.Species); })
			    .style("opacity", 0.5)
			    .attr("class", "bar");


	});
}
// Call the bar chart function to plot 
barChart();


// If the user brushes over points in the second scatter plot, corresponding points in the first scatter plot should be 
// highlighted with increased opacity and an orange border and corresponding bars should be highlighted with an orange 
// border in the bar chart.

 