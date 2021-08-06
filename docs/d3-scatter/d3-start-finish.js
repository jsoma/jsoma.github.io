(function () {

  const margin = { top: 40, right: 30, bottom: 20, left: 40 }

  const width = 400 - margin.left - margin.right
  const height = 500 - margin.top - margin.bottom

  // You'll probably need to edit this one
  const svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  // i'll give you between 0-50k
  // you give back between 0-width (left hand side
  // to the right hand side)
  const xPositionScale = d3.scaleLinear()
    .domain([0, 70000])
    .range([0, width])

  const yPositionScale = d3.scaleLinear()
    .domain([30, 85])
    .range([height, 0])

  const colorScale = d3.scaleOrdinal()
    .range(['#b3e2cd','#fdcdac','#cbd5e8','#f4cae4','#e6f5c9','#fff2ae','#f1e2cc','#cccccc'])

  // hey d3! read in countries.csv
  // and when you're done, go run 'ready'
  d3.csv("countries.csv")
    .then(ready)

  function ready (datapoints) {
    console.log("I'm here!!!!")
    console.log(datapoints)

    // add one circle to the 
    // svg for each datapoint

    // grab all circles inside of the svg
    // attach the datapoints to the circles
    // make sure we have the right num of circles
    svg.selectAll('circle')
      .data(datapoints)
      .join('circle')
      .attr('r', 5)
      .attr('cx', d => xPositionScale(d.gdp_per_capita))
      .attr('cy', d => yPositionScale(d.life_expectancy))
      .attr('fill', d => colorScale(d.continent))

    // now that we've drawn all the circles,
    // they have data associatd with them already
    // grab all the circles, but we only want 
    // the ones that are argentina or japan!
    // then give them a black stroke and raise them
    // up above all of the other circles
    svg.selectAll('circle')
      .filter(d => d.country === 'Argentina' || d.country === 'Japan')
      .attr('stroke', 'black')
      .raise()

    // put a g tag inside of the svg
    // it's just a group of stuff!!!
    // we can move the stuff in it
    // all at once!
    const legend = svg.append('g')
      .attr("transform", "translate(250,300)")

    // we can get a list of continents
    // from the color scale, since it knows
    // what the continents are now
    const continents = colorScale.domain()

    // Add a rectangle for every continent
    // 'Asia', 'Africa', 'Oceania'
    // colorScale('Asia')
    // colorScale('Africa')
    legend.selectAll('rect')
      .data(continents)
      .join('rect')
      .attr('width', 40)
      .attr('height', 15)
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .attr('fill', d => colorScale(d))

    // add a text element for every continent
    legend.selectAll('text')
      .data(continents)
      .join('text')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .text(d => d)
      .attr('dy', 12)
      .attr('dx', 43)
      .attr('font-size', 12)
  
    // .asia-text { background-color: #whatever }
    d3.selectAll(".asia-text")
      .style("background-color", colorScale("Asia"))
    
    d3.selectAll(".oceania-text")
      .style("background-color", colorScale("Oceania"))
    
    // Manually add a single text element that says 'years'
    svg.append("text")
      .text("years")
      .attr("x", -8)
      .attr("y", 13)
      .attr('font-size', 10)
      .attr('text-anchor', 'end')

    var yAxis = d3.axisLeft(yPositionScale);
    svg.append("g")
      .attr("class", "axis y-axis")
      .call(yAxis)

    var xAxis = d3.axisBottom(xPositionScale)
    svg.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    }

})();