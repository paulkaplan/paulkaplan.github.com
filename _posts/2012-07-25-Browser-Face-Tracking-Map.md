---
title: Browser Face Tracking + Google Streetview
layout : post
javascripts: 
  -  
    name : 'ccv'
    location : '/js/posts/20120725/ccv.js'
  -
    name : 'map'
    location : '/js/posts/20120725/map.js'  

triggers :
  -
    id : startMap
    func : initTrigger()
---
{% highlight js %}
navigator.webkitGetUserMedia({video: true},
  function(stream) {
    video.src = window.webkitURL.createObjectURL(stream)
  }, function(err) { alert("Looks like your browser doesn't support using the webcam. Try Chrome"); }
);


function draw() {
  // ctx.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  var comp = ccv.detect_objects({
    "canvas": canvas,
    "cascade": cascade, // Defined in CCV as part of face-detection
    "interval": 5,
    "min_neighbors": 1
  });

  if (comp.length > 0 && comp[0].confidence > 0) { execute(comp[0]); }
}
{% endhighlight %}

<button id="startMap">Start</button>

<video id="input" autoplay="autoplay" controls="false" style="display: none;"></video>
<canvas id="output" height="110" width="150" style="background-color: #000; display: none;"></canvas>

<script src="https://maps.googleapis.com/maps/api/js?sensor=false" type="text/javascript"></script>


<div id="pano" style="width: 1100.0px; height: 800.0px; display:none;"></div>
