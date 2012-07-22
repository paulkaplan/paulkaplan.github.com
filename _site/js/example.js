// var r = d3.select("#chart").property('clientWidth')
//     format = d3.format(",d"),
//     fill = d3.scale.category20c();
//     z = d3.scale.category20c(),
//     i = 0;
//     
// var bubble = d3.layout.pack()
//     .sort(null)
//     .size([r, r]);
// 
// var vis = d3.select("#chart").append("svg")
//     .attr("width", r)
//     .attr("height", r/2)
//     .attr("class", "bubble")
//     .style("pointer-events", "all")
//     .on("mousemove", particle);
// 
// function particle() {
//   var m = d3.svg.mouse(this);
// 
//   vis.append("svg:circle")
//       .attr("cx", m[0])
//       .attr("cy", m[1])
//       .attr("r", 1e-6)
//       .attr('fill-opacity', 1.0)
//       .attr('fill', z(++i))
//     .transition()
//       .duration(2000)
//       .ease(Math.sqrt)
//       .attr("r", 100)
//       .attr('fill-opacity', 1e-5)
//       .remove();
// }

var camera, scene, renderer, projector, data;
var mesh;

init();
animate();
function init() {

	scene = new THREE.Scene();

	//

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 400;
	scene.add( camera );
	//
	
  projector = new THREE.Projector();
  data = d3.range(100).map( function(){ // Note the convenient range() function similar to python
    return new THREE.Vector3(Math.random()*100, Math.random()*100,Math.random()*100);
  });
  
	//

	geometry = new THREE.CubeGeometry( 10, 10, 10 );
	
	for(var n=0; n<data.length; n++){
	  material = new THREE.MeshBasicMaterial( { wireframe: true, color: 0xffaaee});

	  mesh = new THREE.Mesh( geometry, material);
	  mesh.position.x = data[n].x
	  mesh.position.x = data[n].y
	  mesh.position.z = data[n].z
	  scene.add( mesh );
	}

	//

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

}

function animate() {

	requestAnimationFrame( animate );

	mesh.rotation.x += 0.005;
	mesh.rotation.y += 0.01;

	renderer.render( scene, camera );

}