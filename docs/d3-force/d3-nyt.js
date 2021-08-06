(function () {

  // Margin convention
  const margin = { top: 40, right: 30, bottom: 20, left: 200 }

  const width = 700 - margin.left - margin.right
  const height = 1500 - margin.top - margin.bottom

  // You'll probably need to edit this one
  const svg = d3.select("#chart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  const xPositionScale = d3.scaleLinear()
    .domain([0, 0.6])
    .range([0, width])
    .clamp(true)
  
  const colorScale = d3.scaleThreshold()
    .domain([.1, .2, .3, .4, .5])
    .range(["#b35806", "#f1a340", "#fee0b6", "#d8daeb", "#998ec3", "#542788"].reverse())

  const sectors = ["Utilities", "Information technology", "Industrials", "Telecom", "Health care", "Pharma", "Consumer products", "Materials", "Financials", "Retailers", "Energy", "Insurance"]

  const yPositionScale = d3.scalePoint()
    .domain(sectors)
    .range([0, height])

  const radiusScale = d3.scaleSqrt()
    .domain([0, 100000])
    .range([0, 10])

  // hey!!
  // let's simulate how these datapoints interact
  // and we'll make sure they don't overlap
  const forceX = d3.forceX(d => xPositionScale(d.taxes / d.earnings)).strength(2)
  const forceYSplit = d3.forceY(d => yPositionScale(d.sector))
  const forceYCombined = d3.forceY(height / 2)
  const forceCollide = d3.forceCollide(d => radiusScale(d.capitalization) + 1)

  const simulation = d3.forceSimulation()
    .force("overlap", forceCollide)
    .force("y", forceYSplit)
    .force("x", forceX)

  d3.tsv("companies.tsv")
    .then(ready)

  function ready (datapoints) {
    console.log("I'm here!!!!")

    datapoints.forEach(d => {
      d.x = xPositionScale(d.taxes / d.earnings);
      d.y = height / 2;
    })
    // cx
    // cy
    // capitalization
    // earnings
    // taxes <------
    // x
    // y
    // sector
    // name
    // alias
    // symbol

    // Put a text element for every single sector
    // And space them out on the y axis according to the scale

    svg.selectAll('text')
      .data(sectors)
      .join('text')
      .attr('text-anchor', 'end')
      .attr('y', d => yPositionScale(d))
      .attr('dx', -10)
      .text(d => d)

    svg.selectAll('circle')
      .data(datapoints)
      .join('circle')
      .attr('r', d => radiusScale(d.capitalization))
      .attr('cx', d => xPositionScale(d.taxes / d.earnings))
      .attr('fill', d => colorScale(d.taxes / d.earnings))
      .attr('cy', d => yPositionScale(d.sector))
      .attr('stroke', '#333333')
      // set the cx based on your new scale and the taxes column

    d3.select("#combined")
      .on('click', function () {
        // Substitute forceYCombined as our y force
        // instead of whatever was there before
        simulation.force("y", forceYCombined)

        // reheat the simulation (restart it)
        simulation
          .alpha(0.1)
          .alphaTarget(0.1)
          .restart();

        svg.selectAll("text")
          .transition()
          .style('opacity', 0)
      })

      d3.select("#sectors")
        .on('click', function () {
          // Substitute forceYCombined as our y force
          // instead of whatever was there before
          simulation.force("y", forceYSplit)

          // reheat the simulation (restart it)
          simulation
            .alpha(0.1)
            .alphaTarget(0.1)
            .restart();

            svg.selectAll("text")
            .transition()
            .style('opacity', 1)
          })


    simulation.nodes(datapoints)
      .on('tick', ticked)

    function ticked() {
      console.log("tick tick tick")

      svg.selectAll('circle')
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)

    }
  }
})();