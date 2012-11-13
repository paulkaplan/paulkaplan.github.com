---
title: d3.js &#58; A Short Primer
layout: default
---
[d3.js](LINK "d3.js") is a great javascript library for representing and manipulating all sorts of data. It is not an simply an SVG API in the way that [Raphael.js](LINK "raphael.js") is although it does make working with SVG objects considerably easier and the defaults make everything look very pretty. But d3 is more, it is about "Data Driven Documents", as they put it; it provides both the tools and conceptual model to deal with changing data. The data is not limited to population graphs and stock prices. The d3 model can be used for any type of array of things which needs to be mapped onto other things. The most obvious use of this is visually representing arrays of numbers by mapping them to SVG objects. Of course, they could also be mapped onto arrays of DOM elements of any sort, including the plain old `<div>`.
  
###Working with data in d3
This is covered at length elsewhere, most notably [here](LINK TO 3CIRCLES "three litte circles") so I wont go to far here. Remember, d3 is all about mapping arrays onto 'physical' objects (DOM elements, SVG elements, etc). What is different about d3 is that it focuses on the __coming and going__ of data which is just as important if not more important than the initial mapping. The concept of __actors__ 'entering' and 'exiting' the stage is a useful metaphor here. We start (always) with the array of things to be mapped over (not the data), usually with `d3.selectAll('somethings')`. Next we map the data over it with 
{% highlight js%}
var dataMap = d3.selectAll('somethings').data( ourData )
{% endhighlight %}
There are a few possibilities here: either the data outnumber the list of objects you are mapping them onto (say if you where first initializing it, and there where 0 elements and all the data points), you could be perfectly lined up in terms of data and representative elements, or you could have too many objects for the number of data points you have. The pattern usually looks like this

First add more objects if you have to many data points
{% highlight js %}
d3.selectAll('circle')
  .data( ourData ).append('circle')
    .attr(...)
{% endhighlight %}
![.enter()](/img/20120720/d3_enter.JPG ".enter() drawing")

Then remove any left over objects if you have more than you have data
 {% highlight js %}
  d3.selectAll('circle')
    .data( ourData )
      .remove()
  {% endhighlight %}
![.enter()](/img/20120720/d3_exit.JPG ".enter() drawing")

####Using the data
Once we actually get to using the data, it is relatively simple with d3's very extensive SVG API
{% highlight js%}
// The standard d3 examples include things like creating the svg canvas
var svg = d3.select('html').append('svg')
// creating some data
var data = d3.range(100).map( function(){ // Note the convenient range() function similar to python
  return [Math.random()*100, Math.random()*100];
});
// and creating some elements, setting their attributes
svg.selectAll('circle') // Remember it is ok that none of them exist yet
  .data( data ).enter() // We know all the data will end up here, 
                        // since there are no circles yet
  .append('circle') // So we create one for each data point
    .attr('r', function(d){ return d.x}) 
// Unless an attribute will be the same for every element,
//    it must be filled with a function to be called on each point.
// Also, d3 alias' arrays with 2 values [x,y] to have 
//    d.x and d.y available by default. 
    .transition()
      .duration(1000) //milliseconds
      .attr('r', 0) // shrink to radius 0 over the given duration
      
{% endhighlight %}
![.enter()](/img/20120720/d3_data.JPG ".enter() drawing")