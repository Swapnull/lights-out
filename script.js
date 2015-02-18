var grid = []
var gridX = 5
var gridY = 5

$(document).ready(function(){
  drawGrid()
  randomiseGrid()

});


function drawGrid(){
  for(var i=0; i< gridX; i++){
    for(var j =0; j < gridY; j++){
      grid.push([i,j])
      $('.grid').append('<div class="grid-item" id="'+ i + '-' + j +'"></div>')
    }
  }
};

function randomiseGrid(){
  var startingOn = Math.floor((Math.random() * (gridX*gridY)) +1)
  console.log(startingOn)

  var randArray = []
  for(var i = 0; i < startingOn; i++){
    randArray.push(Math.floor((Math.random()* gridX*gridY)+1))
  }

  console.log(randArray)

  for(var i = 0; i < startingOn; i++ ){
    randArray[i] = grid[randArray[i]]
  }

  console.log(randArray)

  for(var i = 0; i < startingOn; i++){
    var id = '#' + randArray[i][0] + '-' + randArray[i][1]
    if(! $(id).hasClass('lights-on')){
      $(id).addClass('lights-on')
    }
  }

}

$(document).on('click touchstart', '.grid-item', function(){
  var id = $(this).attr('id')
  id = id.split('-')
  var x = parseInt(id[0])
  var y = parseInt(id[1])

  toggleState(x, y)
  toggleState(x, y+1)
  toggleState(x+1, y)
  toggleState(x, y-1)
  toggleState(x-1, y)

  var endcaseY = gridY - 1

  if($('div.lights-on').length == 2 && $('#'+ endcaseY + '-0').hasClass('lights-on') && $('#'+ endcaseY + '-1').hasClass('lights-on')){
    alert("The game is uncompletable from here. To carry on playing, click 'new game'")
  }else if($('div.lights-on').length == 0){
    alert("CONGRATULATION! You have won the game. Click 'new game' to see if you can do it again!");
  }



});

$(document).on('click touchstart', '#new-game', function(){
  grid.length = 0
  $('.grid').empty()
  drawGrid()
  randomiseGrid()
});


function toggleState(x, y){
  var currentId = '#' + x + '-' + y
  $(currentId).toggleClass('lights-on')
}
