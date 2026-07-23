const roadmapData = [

{
    title:"C",
    month:0,
    row:0,
    desc:"Started programming."
},

{
    title:"Java",
    month:2,
    row:0,
    desc:"Object Oriented Programming."
},

{
    title:"Python",
    month:5,
    row:2,
    desc:"Automation and scripting."
},

{
    title:"MySQL",
    month:4,
    row:1,
    desc:"Database Development."
},

{
    title:"Apache NiFi",
    month:8,
    row:1,
    desc:"Enterprise ETL Pipelines."
},

{
    title:"Apache Spark",
    month:11,
    row:1,
    desc:"Big Data Processing."
},

{
    title:"Machine Learning",
    month:14,
    row:3,
    desc:"Neural Networks."
},

{
    title:"LLMs",
    month:16,
    row:3,
    desc:"AI Agents & Automation."
}

];

const container=document.getElementById("roadmap-dots");

const colors=[
"#1565c0",
"#2e7d32",
"#ef6c00",
"#8e24aa"
];

roadmapData.forEach((item,index)=>{

    const dot=document.createElement("div");

    dot.className="roadmap-dot";

    dot.style.left=(item.month*90+50)+"px";

    dot.style.top=(390-item.row*130)+"px";

    dot.style.background=colors[item.row];

    dot.style.animationDelay=(index*0.15)+"s";

    dot.innerHTML="<span>"+item.title+"</span>";

    dot.dataset.description=item.desc;

    container.appendChild(dot);

});
