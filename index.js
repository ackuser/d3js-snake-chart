// Import stylesheets
import "./style.scss";

import * as d3 from "d3";

// Write Javascript code!
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3
  .select("#dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Read the data
const data = [
  { x: 0, y: 30.01 },
  { x: 1, y: 32.16 },
  { x: 2, y: 22.7 },
  { x: 3, y: 34.98 },
  { x: 4, y: 45.02 },
  { x: 5, y: 16.54 },
  { x: 6, y: 24.49 },
  { x: 7, y: 9.35 },
  { x: 8, y: 32.11 },
  { x: 9, y: 51.62 }
];

const xData = data.map(obj => obj.x);

const yData = data.map(obj => obj.y);

console.log(xData);
console.log(d3.extent(xData));

// Add X axis --> it is a date format
var x = d3
  .scaleBand()
  .domain(xData)
  .range([0, width]);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3
  .scaleLinear()
  .domain([-10, 80])
  .range([height, 0]);
svg.append("g").call(d3.axisLeft(y));

// Show confidence interval
svg
  .append("path")
  .datum(data)
  .attr("fill", "#cce5df")
  .attr("stroke", "none");

// Add the line
svg
  .append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr(
    "d",
    d3
      .line()
      .x(d => {
        return x(d.x);
      })
      .y(d => {
        return y(d.y);
      })
      .curve(d3.curveNatural) // apply smoothing to the line
  );
