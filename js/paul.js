var placesYouMightFindMe = [
  { place : 'and in the lab', next  : {
      place : 'the beat lab, that is' }
  },
  { place : 'and in Costa Rice' },
  { place : 'and in space' },
  { place : "and chillin out'", next : {
      place : "maxin', relaxin'",  next : {
        place : "playin' some b-ball", next : {
          place : "outside the school", next : {
            place : "when a couple of guys", next : {
              place : "who where up to no good", next : {
                place : "started makin' trouble in my neighborhood", next : {
                  place : "I got in one little fight", next : {
                    place : "and my mom got scared", next : {
                      place : "and said you're livin'", next : {
                        place : "with your auntie and uncle", next : {
                          place : "in bel air"
                        }
                      }
                    } // I sincerely hope someone finds this
                  } // If you do, drop me a line by email or something
                } // It will make my day!
              } // Screw that, it'd make my week!
            }
          } // Sometimes I imagine the way back from a hugely indented block
        } // As pioneers on the Oregon Trail
      } // Or people on a death march...
    }
  } // Kinda the same thing, since I always got cholera or bit by a snake
  // :)
]
var numberOfPlacesYouMightFindMe = placesYouMightFindMe.length;
var nextPlaceYoullFindMe, lastPlaceIWas;
function chooseMyNextPlace(lastPlaceIWas) {
  if(nextPlaceYoullFindMe){ return nextPlaceYoullFindMe }
  else return placesYouMightFindMe[ 
    Math.floor( Math.random()*numberOfPlacesYouMightFindMe )
  ];
}
$(document).ready( function(){
  $('a.ding').bind('click', onDing);


  function onDing(e){
    e.stopPropagation();
    var upcomingPlaceYoullFindMe = chooseMyNextPlace()
    var heading = $(this).parent().parent().children('h2');
    heading.html( upcomingPlaceYoullFindMe.place )
    heading.append(this);
    $('a.ding').bind('click', onDing);

    if(upcomingPlaceYoullFindMe.next){ nextPlaceYoullFindMe = upcomingPlaceYoullFindMe.next}
    else nextPlaceYoullFindMe = 0;
    
    return false
  }
});
