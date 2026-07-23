/********************************************************************
 * Skill Roadmap Engine - Part 1
 * Builds the SVG canvas, grid and axes
 ********************************************************************/

const svg = document.getElementById("roadmap-svg");

const categories = [
    "Engineering",
    "Technologies",
    "Languages",
    "AI Technologies"
];

// Colors for each lane
const laneColors = {
    "Engineering": "#1565c0",
    "Technologies": "#43a047",
    "Languages": "#fb8c00",
    "AI Technologies": "#8e24aa"
};

// Drawing area
const chart = {

    width: 1400,
    height: 650,

    margin: {
        left: 170,
        right: 80,
        top: 60,
        bottom: 90
    }

};

chart.innerWidth =
    chart.width -
    chart.margin.left -
    chart.margin.right;

chart.innerHeight =
    chart.height -
    chart.margin.top -
    chart.margin.bottom;


// SVG namespace
const NS = "http://www.w3.org/2000/svg";

function create(tag, attrs = {}) {

    const el = document.createElementNS(NS, tag);

    Object.entries(attrs).forEach(([k, v]) => {

        el.setAttribute(k, v);

    });

    return el;

}

function clearSVG() {

    while (svg.firstChild)
        svg.removeChild(svg.firstChild);

}

/********************************************************************
 * Build Chart
 ********************************************************************/

function buildChart() {

    clearSVG();

    svg.setAttribute("viewBox", `0 0 ${chart.width} ${chart.height}`);

    drawHorizontalLanes();

    drawVerticalYears();

}

/********************************************************************
 * Horizontal Category Lanes
 ********************************************************************/

function drawHorizontalLanes() {

    const laneGap =
        chart.innerHeight /
        (categories.length - 1);

    categories.forEach((category, i) => {

        const y =
            chart.margin.top +
            laneGap * i;

        // Horizontal Line

        svg.appendChild(

            create("line", {

                x1: chart.margin.left,
                y1: y,

                x2: chart.width - chart.margin.right,
                y2: y,

                class: "grid-line"

            })

        );

        // Colored Guide

        svg.appendChild(

            create("line", {

                x1: chart.margin.left,
                y1: y,

                x2: chart.margin.left + 70,
                y2: y,

                stroke: laneColors[category],
                "stroke-width": 5,
                "stroke-linecap": "round"

            })

        );

        // Category Label

        const label = create("text", {

            x: 20,
            y: y + 6,

            class: "category-label"

        });

        label.textContent = category;

        svg.appendChild(label);

    });

}

/********************************************************************
 * Years
 ********************************************************************/



function drawVerticalYears() {

    const years =
        endYear - startYear;

    const spacing =
        chart.innerWidth /
        years;

    for (let y = startYear; y <= endYear; y++) {

        const x =
            chart.margin.left +
            (y - startYear) * spacing;

        // Vertical Grid

        svg.appendChild(

            create("line", {

                x1: x,
                y1: chart.margin.top,

                x2: x,
                y2: chart.height - chart.margin.bottom,

                class: "year-line"

            })

        );

        // Year Label

        const label = create("text", {

            x: x - 18,
            y: chart.height - 35,

            class: "year-label"

        });

        label.textContent = y;

        svg.appendChild(label);

    }

}

/********************************************************************
 * Resize
 ********************************************************************/

window.addEventListener("resize", () => {

    buildChart();

});

/********************************************************************
 * Start
 ********************************************************************/
let roadmap=[];

let startYear=0;

let endYear=0;

function determineYears(){

    startYear=Math.min(...roadmap.map(s=>s.year));

    endYear=Math.max(...roadmap.map(s=>s.year));

}

/********************************************************************
 * Load JSON
 ********************************************************************/

fetch("assets/data/roadmap.json")
.then(r=>r.json())
.then(data=>{

    roadmap=data;

    determineYears();

    buildChart();

    drawSkills();

});
/********************************************************************
 * Category Position
 ********************************************************************/

function categoryY(category){

    const gap=
        chart.innerHeight/
        (categories.length-1);

    return chart.margin.top+
           categories.indexOf(category)*gap;

}

/********************************************************************
 * X Position
 ********************************************************************/

function skillX(skill){

    const totalYears=endYear-startYear+1;

    const yearWidth=
        chart.innerWidth/totalYears;

    return chart.margin.left+

        (skill.year-startYear)*yearWidth+

        ((skill.month-1)/12)*yearWidth;

}
/********************************************************************
 * Draw Skills
 ********************************************************************/

function drawSkills(){

    roadmap.forEach(skill=>{

        const x=skillX(skill);

        const y=categoryY(skill.category);

        const dot=create("circle",{

            cx:x,

            cy:y,

            r:7,

            class:"roadmap-dot dot-"+

            skill.category
            .replace(" ","")
            .replace("Technologies","technology")
            .replace("Engineering","engineering")
            .replace("Languages","language")
            .replace("AI","ai")
            .toLowerCase()

        });

        svg.appendChild(dot);

        const label=create("text",{

            x:x,

            y:y-15,

            class:"skill-label"

        });

        label.setAttribute("text-anchor","middle");

        label.textContent=skill.title;

        svg.appendChild(label);

        dot.addEventListener("mouseenter",()=>{

            label.style.opacity=1;

            dot.setAttribute("r",10);

        });

        dot.addEventListener("mouseleave",()=>{

            label.style.opacity=0;

            dot.setAttribute("r",7);

        });

    });

}
