var width = document.getElementsByTagName('html')[0].clientWidth;
    height = $('html').height();
function reHeight(){
  if(width<=767){ 
    var sum = 0;
    $('div').each( function(){
      sum += $(this).height()
    });
    height = (sum+height) /2; // its somewhere in there...
  }
}
reHeight();
    // document.getElementsByTagName('div').reduce( function(a,b){ return $(a).height + $(b).height} )};
var vertices = d3.range(100).map(function(d) {
  return [Math.random() * width, Math.random() * height];
});
var Controls = function(){
  var _this = this;
  this.refresh = function(){
    var circs = svg.selectAll("circle").data(vertices)
    circs.enter().append("circle")
        .attr("class", "being-added")
        .attr("r", 10)
        .attr("transform", function(d) { return "translate(" + d + ")"; })
      .transition()
          .duration(1000)
          .attr("r", 0)
          .attr("class", "")
    circs.exit()
        .attr("r",10)
        .attr("class", "being-removed")
      .transition()
        .duration(500)
        .attr("r",0)
        .remove();
      
    svg.selectAll("path")
        .data(typeFunc(vertices))
        .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
    paths = svg.selectAll("path")
        .data(typeFunc(vertices).map(function(d) { return "M" + d.join("L") + "Z"; }))
    paths.filter(function(d) { return this.getAttribute("d") != d; })
        .attr("d", function(d) { return d; });
    paths.exit().remove()
  };
  this.pop = function(){
    vertices.pop();
    _this.refresh();
  };
  this.push = function(){
    // vertices.pop()
    vertices.push([Math.random() * width, Math.random() * height])
    _this.refresh();
  };
  this.changeFunc = function(){
    if(renderDelaunay){
      typeFunc = d3.geom.voronoi;
      renderDelaunay = false;
    } else {
      typeFunc = d3.geom.delaunay;
      renderDelaunay = true;
    }
    _this.refresh();
  }
}
var control = new Controls();
var paths;
var renderDelaunay = false;
var typeFunc = d3.geom.voronoi;
var html = d3.select("html")
  .on("mousemove", update);
var svg = d3.select("html")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "PiYG")
    // .on("mousemove", update);
var popControl = d3.select("#pop")
  .on("click", control.pop);
var pushControl = d3.select("#push")
  .on("click", control.push);
var changeFunc = d3.select("#changeFunc")
  .on("click", control.changeFunc);

// Window resizing
var resizing = false;
var finishedResizing = true;;
var resize = function(repeated){
  resizing = false;
  setTimeout( function(){
    if(!resizing){
      if(!finishedResizing){
        width = document.getElementsByTagName('html')[0].clientWidth;
        height = document.getElementsByTagName('html')[0].clientHeight;
        reHeight();
        svg.attr("width", width)
           .attr("height", height);
        vertices = d3.range(100).map(function(d) {
          return [Math.random() * width, Math.random() * height];
        });
        control.refresh();
        finishedResizing = true; 
      }
    } else { if(!repeated){resize(true);} }
  }, 200);
};

d3.select(window).on('resize', function(){
  resizing = true;
  finishedResizing = false;
  resize(false)
});

svg.selectAll("path")
    .data(typeFunc(vertices))
  .enter().append("path")
    .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
    .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

svg.selectAll("circle")
  .data(vertices)
  .enter().append("circle")
    .attr("r", 0)
    .attr("transform", function(d) { return "translate(" + d + ")"; })
function update() {
  // And check the currently used function
  if(renderDelaunay){
    typeFunc = d3.geom.delaunay
  }
  
  vertices[0] = d3.mouse(this);
  paths = svg.selectAll("path")
      .data(typeFunc(vertices).map(function(d) { return "M" + d.join("L") + "Z"; }))
  paths.filter(function(d) { return this.getAttribute("d") != d; })
      .attr("d", function(d) { return d; });
  paths.exit().remove()
}
// var nameList = [
//   'Frank Huijben',
//   'Robert Behringer',
//   'Paul Chaikin',
//   'Erik Steltz',
//   'Anette Hosoi'
// ]
// var names = d3.range(20).map(function(d) {
//   return {
//     x : Math.random() * 600 + 200,
//     y : Math.random() * 500 + 250,
//     name: nameList[ Math.floor( Math.random()*nameList.length ) ]
//   }
//   // return [Math.random() * // width, Math.random() * height];
// });
// // Cell and plot.
// var cell = svg.selectAll("g.cell")
//     .data(names)
//   .enter().append("g")
//     .attr("class", "cell")
//     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
//     // .each(plot);
// var padding = 5;
// // Titles for the diagonal.
// cell.append("text")
//     .attr("x", padding)
//     .attr("y", padding)
//     .attr("fill", "#fff")
//     .attr("dy", ".71em")
//     .text(function(d) { return d.name; });