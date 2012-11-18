// $('a.gallery-image').fancybox()

$('span.arrow > a').click( function(){ onClick( Math.floor( Math.random()*backgrounds.length ) )  })
var bgIndex = 0;
var backgrounds = [
  "tower2",
	"topView",
  "persp_disc",
  "halfTower"
]

function onClick(index){
	bgIndex += 1;
	bgIndex %= backgrounds.length
  var src = "/img/photo/"+backgrounds[bgIndex]+".jpg";
  $('.bg').css('background-image', 'url('+src+')');
  console.log('changed')
}

$('a#digital-matter').click( function(){
	$('a').not('a#digital-matter').children('h2').addClass('blur')
	$('.bg').addClass('blur')
	$('.eightcol').show()
})
// $('.bg').addClass('blur')