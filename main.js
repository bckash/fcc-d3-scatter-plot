
const chartWidth = 1000;
const chartHeight = 500;
const chartPadding = 50;


document.addEventListener("DOMContentLoaded", () => {
    const req = new XMLHttpRequest();
    req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json", true)
    req.send()
    req.onload = () => {

        const json = JSON.parse(req.responseText)
        const parseTime = d3.timeParse("%M:%S")
        const parseYear = d3.timeParse("%Y")

        // data for defining axis

        let dataTimeFirst = parseTime(json[0].Time);
        let dataTimeLast = parseTime(json[json.length-1].Time)
        let dataYearFirst = parseYear(d3.min(json, d => d.Year))
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

    } 

    
    console.log(req)
})