---
title: Web Audio Theremin
layout : post
javascripts: 
  -  
    name : 'ccv'
    location : '/js/posts/20120725/ccv.js'
  - 
    name : 'RAF'
    location : '/js/posts/common/requestAnimationFrame.js'
  - 
    name : 'three'
    location : '/js/posts/common/three.js'
  -
    name : 'sine'
    location : '/js/posts/20120725/sine.js'  
  -
    name : 'theremin'
    location : '/js/posts/20120725/theremin.js'
triggers:
  -
    id : startTheremin
    func : initTrigger()
  -
    id : stopTheremin
    func : stop()
---


<button id="startTheremin">Start Theremin</button>
<button id="stopTheremin">Stop Theremin</button>
<h4 style="margin-bottom:-2em;"> theremin </h4>
<video id="input" autoplay="autoplay" controls="false" style="display: none;"></video>
<canvas id="output" height="110" width="150"></canvas>