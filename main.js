
const chartWidth = 1000;
const chartHeight = 800;
const chartPadding = 50;

const toolTip = d3
    .select("#title")
    .append("dl")
    .attr("id", "tooltip")
    .style("display", "none");


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
        
        // data for defining axis

        let dataTimeFirst = parseTime(json[0].Time);
        let dataTimeLast = parseTime(json[json.length-1].Time)
        let dataYearFirst = parseYear(d3.min(json, d => d.Year - 1))
        let dataYearLast = parseYear(d3.max(json, d => d.Year + 1))

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
            .data(json)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("data-xvalue", d => parseYear(d.Year))
            .attr("data-yvalue", d => parseTime(d.Time))
            .attr("cx", d => xScale(parseYear(d.Year)))
            .attr("cy", d => yScale(parseTime(d.Time)))
            .attr("r", 6)
            .style("fill", d => d.Doping === "" ? "cornflowerblue" : "chocolate")
            .style("stroke", "black")
            .style("opacity",".8")
            .on("mouseover", () => {
                toolTip
                    .style("display", "block")
            })
            .on("mousemove", (ev,d) => {
                toolTip
                .html(`
                    <p>${d.Name}, ${d.Nationality}</p>
                    <div>
                        <dt>${Object.keys(d)[4]} : </dt>
                        <dd>${d.Year}</dd>
                    </div>
                    <div>
                        <dt>${Object.keys(d)[0]} : </dt>
                        <dd>${d.Time}</dd>
                    </div>
                    `)
                .attr("data-year", parseYear(d.Year))
                .style("right", window.innerWidth - ev.pageX - 100 + "px")
                .style("top", ev.pageY + "px")
            })
            .on("mouseleave", () => {
                toolTip
                    .style("display","none")
            })

    } 

    
})