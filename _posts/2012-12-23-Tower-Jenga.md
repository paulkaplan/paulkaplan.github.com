---
title : Tower Jenga
layout: post
preview: 'While I set out to make a game of jenga, trying to see if I could do the same thing with <a href="http://schteppe.github.com/cannon.js/">cannon.js</a> as they do with the <a href="http://chandlerprall.github.com/Physijs/examples/jenga.html">Physi.js example</a>, I ended up figuring out how to build the tower iteratively then having way more fun blowing up the tower with projectiles. So I give you, the new and improved Jenga game. '
---

<div class="img left" style="max-width:40%"><a href="/img/projects/towerLong.png" class="gallery"><img src="/img/projects/towerLong.png" /></a><p class="caption">Jenga is way more fun with ammunition</p></div>

## Jenga (defense)

While I set out to make a game of jenga, trying to see if I could do the same thing with <a href="http://schteppe.github.com/cannon.js/">cannon.js</a> as they do with the <a href="http://chandlerprall.github.com/Physijs/examples/jenga.html">Physi.js example</a>, I ended up figuring out how to build the tower iteratively (hint: lay three, rotate, lay three... not to complicated!) then just having way more fun blowing up the tower with projectiles. So I give you, the new and improved Jenga game. 

It does not, of course, have a purpose. Or score. Or players. But you can shoot projectiles at a big tower and watch it explode, which is more than enough fun for me.
WebGL is dangerous for me because halfway through a project I often realize I have already built something more than fun enough to entertain myself, so I stop there and play with it all day.

Controls are simple:

<ul>
  <li>click/drag to move the camera ( or hold 'a' and move mouse)</li>
  <li>hold 's' and move mouse to zoom</li>
  <li>hold 'd' and move mouse to pan</li>
  <li>shift + click -> shoot ball towards wherever the camera is looking, from the camera position</li>
</ul>

This will only work on modern browsers (Chrome) with webGL enabled (Safari and Firefox support webGL but you may have to enable it).
Play with it <a href="http://paulkaplan.me/Experiments/Editor/battle.html">here</a>