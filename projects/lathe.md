---
title : Lathe
layout : project_md
image : /img/thumbs/lathe.png
---

## Hackathon Project: Digital Lathe
<div class="img left" style="max-width:45%;"><a href="/img/projects/lathe_at_hackathon.jpg" class="gallery"><img src="/img/projects/lathe_at_hackathon.jpg" /></a><p class="caption">Digital Lathe + 3D Printer, photo by Vivian Wan</p></div>


The UChicago 'hackers' group, [hack@uchicago](http://hack.uchicago.edu), that a few friends and I started on campus a few years ago has grown considerably. Since our hackathon last year in the spring took place at the Booth School of Business and certainly had a very corporate, startup-weekend type of feel to it we decided to go the other direction this time. 

The result was our first (Un)hackathon, where the only rule was that you had to go beyond the functionality built in to the standard MVC framework (I'm looking at you, Rails). [Inventables](http://inventables.com) sponsored the weekend and brought a couple 3D printers and CNC machines for us to hack on, which was awesome. Constraints breed creativity, and we got some pretty cool projects going: a Portal turret, a digital ammo counter built into a Nerf gun, a portable N64 and many others.

I really wanted to built an interface for designing some kind of 3D object in browser, and have it come off the web and directly into the 3D printer (i.e. in an STL file). Seeing things like a [web based cookie cutter designer](http://cookiecaster.com/) led me to think about similar problems with a "reduced dimensionality": they are technically 3D objects in their final form but can be easily represented in 2D. This not only makes them quick to store and transport, but this class of objects is much, much easier to modify with the 2D tools we have (screen, mouse, etc).
<div class="img right"><a href="/img/projects/lathe_interface.png" class="gallery"><img src="/img/projects/lathe_interface.png" /></a><p class="caption">Simple UI: tools on the left, model on the right.</p></div>
I used the metaphor of a lathe (or potters wheel) because it involves exactly this type of reduction in dimensions. While a cookie cutter is a 2D path extruded into 3D space, a lathe takes a 2D path and revolves it around an axis to create a 3D object. Radial symmetry isn't a contrived 2D -> 3D conversion either, you see it in many daily objects, like wine glasses and vases. With that metaphor in mind, I started out to create a digital lathe. 


There are a few different parts to this project:

- __User Interface:__ Need a collection of "tools" to use, mapping the application of those tools between 2D and 3D representation, displaying and updating 3D object, general mechanics like undo, save, etc. 
- __Data representation:__ how to represent a digitized cylinder in a 'continuous' way, in order to make it resolution independent. 
- __Mesh Generation:__ After shipping the 2D representation to the server, how to recreate the 3D object and triangulate every face on that object. 
- __3D Print-ability:__ Figure out how to write (hopefully binary) STL files, hollow out the model to save material and create 'cups', figure out minimum printable thickness', make the mashes manifold so the printer accepts them, etc. 
- __iPad app:__ The "potter's wheel" metaphor begs for a physical interface, iPad would be the perfect outlet for it. 

Obviously a lot for just 36 hours. The first iteration I did entirely in javascript: front end used the [THREE.js](http://mrdoob.github.com/three.js/ "THREE.js") webGL API and the backend mesh generation was on a Node.js server. That is what I showed during the demo last weekend, and it won me a [Makerbot Replicator 2](https://store.makerbot.com/replicator2.html "Makerbot Replicator 2") donated by the [Division of Physical Sciences](http://psd.uchicago.edu/) here at Uchicago! The code is an absolute mess, but you can [see it here](https://github.com/paulkaplan/Experiments/tree/gh-pages/Lathe/node) 

<div class="img left"><a href="/img/thumbs/lathe.png" class="gallery"><img src="/img/thumbs/lathe.png" /></a><p class="caption">Ray traced rendering of a wine glass made on the lathe</p></div>

The fancy renderings are part of v0.0.0.0.2 that I made a couple days before [ORD Camp](http://ordcamp.com/, "ORD Camp") last weekend. [Zach Kaplan](http://about.me/zachkaplan "Zach at about.me"), Inventables CEO, invited me to come volunteer at ORD Camp and show off the lathe and help organize and introduce people to the 3D printers they brought.


I moved the system to Rails, to take advantage of built in database support and try out a couple of different queuing systems, I ended up using [Sidekiq](https://github.com/mperham/sidekiq "sidekiq"). I needed some sort of delayed job system because I wanted to move the mesh generation process and rendering out of the servers way. While mesh generation usually takes less than a second, rendering with a ray tracer could take up to a couple minutes, so it needed to be done in the background. You can see the [code for the new version on Github](https://github.com/paulkaplan/Lathe). 

I used POVray to do the raytracing, and in the process started to compile my own little ruby library for ruby that outputs POVray. I made it into a gem which I'll put out soon. It is super experimental, but it is way better than writing POVray files by hand.

I'll write a part 2 on the particulars of how it works, the iPad version, and plans for the future. Coming soon.

In the mean time, here are some samples of what came out of the 3D printer, straight from the web interface!
<div class="img right"><a href="/img/projects/lathe_samples3.jpg" class="gallery"><img src="/img/projects/lathe_samples3.jpg" /></a><p class="caption">"Come on, it's a tiny wine glass!" My demo. Photo by Vivian Wang</p></div>
<div class="img"><a href="/img/projects/lathe_samples.jpg" class="gallery"><img src="/img/projects/lathe_samples.jpg" /></a><p class="caption">A couple of the first attempts, chess pieces and wine glass. Photo by Vivian Wang</p></div>
