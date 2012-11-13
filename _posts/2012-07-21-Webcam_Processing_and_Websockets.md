---
layout: default
title: Webcam, Processing and Websockets
---

{% highlight java %}
import hypermedia.video.*;  //  Imports the OpenCV library
import java.awt.Rectangle;  //  Strangely isn't included, has to be imported
import org.webbitserver.*;  // P5 Websocket Library for Processing
{% endhighlight %}

{% highlight java %}
WebSocketP5 socket;
OpenCV opencv;
Rectangle[] faces;          // We'll only use one for now, but leave options open
{% endhighlight %}

{% highlight java %}
void setup()
{
  socket = new WebSocketP5(this,8080);

  size ( 320, 240 );
  opencv = new OpenCV( this );
  opencv.capture( 320, 240 );
  opencv.cascade( OpenCV.CASCADE_FRONTALFACE_ALT );
}
{% endhighlight %}

{% highlight java %}
void draw()
{
  opencv.read(); 
  image( opencv.image(), 0, 0 );  //  Draws the camera image to the screen
  opencv.convert( GRAY );
  faces = opencv.detect( 1.2, 2, OpenCV.HAAR_DO_CANNY_PRUNING, 40, 40 );
  noFill();
  stroke(255,0,0);
  
  // Server side websocket message
  for( int i=0; i<faces.length; i++ ) {
    rect( faces[i].x, faces[i].y, faces[i].width, faces[i].height );
    socket.broadcast( Arrays.toString( 
          new float[] {(float)(faces[i].x+faces[i].width/2)/(320.0), 
                       (float)(faces[i].y+faces[i].height/2)/(240.0), 
                       (float)faces[i].width/320.0,     // size of rect determines 'zoom'
                       (float)faces[i].height/240.0})
                                      .replace("[", "")
                                      .replace("]", "")
    );
}
void stop() {
  socket.stop(); // Responsible citizens close their websockets after use
}
{% endhighlight %}



### THREE.js "WebcamControls"
TrackballControls, with a very slight modification.
{% highlight js%}
// Declare these instead of the standard mouseX,mouseY
// They hold the previous face/mouse position
this.faceX;
this.faceY;

// and the face analog to onMouseMove()
this.onFaceMove = function( event ) {
  this.faceX = event.faceX * this.viewHalfX * 4 - 2*this.viewHalfX;
  this.faceY = event.faceY * this.viewHalfY * 4 - 2*this.viewHalfY;
  this.faceZ = (event.faceZ - 0.19) * 3;  // Arbitrary scaling that worked
};
{% endhighlight %}



### Client side websocket
{% highlight js %}

var ws = new WebSocket("ws://localhost:8080/p5websocket")

ws.onmessage = function (e) {
  var face = e.data.split(",")
  var xoff = parseFloat(face[0])
  var yoff = parseFloat(face[1])
  var z    = parseFloat(face[2])
  controls.onFaceMove({
    faceX : xoff,
    faceY : yoff,
    faceZ : z
  });
};
{% endhighlight %}
