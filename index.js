var compList = [];
var userlist = [];
var indx;
var compcolor;
var shouldStart = false;
var level = 0;
var lastColor;

var start = new Audio('sounds/start.mp3');
start.play();

$(document).keypress(function(){
    start.pause();
    if(!shouldStart){
        $('#level-title').text('Level ' + level);
        keepPlaying();
        shouldStart = true;
    }
});


function press_edit(color){
    $('.'+color).addClass('pressed');
    $("."+color).fadeOut(100).fadeIn(100);
    setTimeout(function(){
        $('.'+color).removeClass('pressed');
    }, 150);
}

function add_sound(color){
    var audio = new Audio('sounds/'+color+'.mp3');
    audio.play();
    press_edit(color);
}

$('.btn').mousedown(function(event){

    new_color = event.target.id;
    add_sound(new_color);
    userlist.push(new_color);
    lastColor = userlist.length-1;
    colorCheck(lastColor);

});

function colorCheck(lastColor){
    
    if(userlist[lastColor] === compList[lastColor]){
        console.log('true');

        if(userlist.length === compList.length){
            setTimeout(function() {
                keepPlaying();
            }, 1000);
        }
    }
    else{
        restartGame();
    }
}


function keepPlaying(){

    userlist = [];
    level++;
    $('#level-title').text('Level ' + level);

    indx = Math.floor(Math.random() * 4);
    compcolor = $('.btn')[indx].id;
    press_edit(compcolor);
    compList.push(compcolor);
    add_sound(compcolor);

}

function restartGame(){
    userlist = [];
    compList = [];
    level = 0;
    shouldStart = false;
    $('#level-title').text('Press  ENTER to Restart');
    audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $('body').addClass('game-over').fadeIn(100).fadeOut(100);
    setTimeout(function(){
        $('body').removeClass('game-over').fadeIn(100);
    }, 100);
}
