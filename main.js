
const chartWidth = 1000;
const chartHeight = 800;
const chartPadding = 50;


document.addEventListener("DOMContentLoaded", () => {
    const req = new XMLHttpRequest();
    req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", true)
    req.send()
    req.onload = () => {

        const json = JSON.parse(req.responseText)
        // string to date :
        const parseTime = d3.timeParse("%M:%S")
        // date to string :
        const formatTime = d3.timeFormat("%M:%S")
        const parseYear = d3.timeParse("%Y")
        // array of date objects :
        const dataset = json.map( d => [parseYear(d.Year), parseTime(d.Time)])
        console.log(dataset)
        
        // data for defining axis

        let dataTimeFirst = parseTime(json[0].Time);
        let dataTimeLast = parseTime(json[json.length-1].Time)
        let dataYearFirst = parseYear(d3.min(json, d => d.Year - 1))
        let dataYearLast = parseYear(d3.max(json, d => d.Year))

        console.dir(dataTimeFirst)
        console.dir(dataTimeLast)
        console.dir(dataYearFirst)
        console.dir(dataYearLast)

        // X

        const xScale = d3
            .scaleTime()
            .domain([dataYearFirst, dataYearLast])
            .range([chartPadding, chartWidth-chartPadding])

        const xAxis = d3
            .axisBottom(xScale)

        // Y

        const yScale = d3
            .scaleTime()
            .domain([dataTimeFirst, dataTimeLast])
            .range([chartHeight-chartPadding, chartPadding])

        const yAxis = d3
            .axisLeft(yScale)
            .tickFormat(formatTime)

        // SVG

        const svg = d3
            .select("#title")
            .append("svg")
            .attr("width", chartWidth)
            .attr("height", chartHeight)
    
            svg
            .append("g")
            .attr("transform", "translate(0,"+ (chartHeight - chartPadding) +")")
            .attr("id","x-axis")
            .call(xAxis)    

            svg
            .append("g")
            .attr("transform", "translate("+chartPadding+",0)")
            .attr("id","y-axis")
            .call(yAxis)

            svg
            .selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("data-xvalue", d => d[0])
            .attr("data-yvalue", d => d[1])
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 5)

            console.log([json[0].Time, json[0].Year])
    } 

    
})