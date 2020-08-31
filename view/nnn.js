let pausebtn = document.querySelector('#stop');
let playbtn = document.querySelector('#play');
let f = document.querySelector('#form');
let t = document.querySelector('#tim');
let downl = document.querySelector('#download');
let subs = document.querySelector('#subscribe');

var d0 = 0;
//check wether user is really watching or not
function changeScreenDetect() {
    addEventListener("visibilitychange", (e)=> {
        if (document.visibilityState == 'hidden') {
            d = 5;
            clearInterval(inter);
            t.innerHTML = 'timer';
            player.stopVideo();
            console.log('won\'t work');
        }
    });
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: 'YfO28Ihehbk',
    events: {
      'onReady': onPlayerReady,
    }
  });
}
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  let xhttp = new XMLHttpRequest();
           // xhttp.overrideMimeType("text/plain");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            t.value = this.responseText+'Rs. time remaining';
        }
    };
    xhttp.open("GET", "/check", false);
    xhttp.send();
    
}

var inter, d, key;
function requestSend() {
    let xhttp = new XMLHttpRequest();
           // xhttp.overrideMimeType("text/plain");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            key = this.responseText;
        }
    };
    xhttp.open("GET", "/generateKey", false);
    xhttp.send();
}
function timer() {
    d = 5;
    inter = setInterval(()=>{
        t.value = d + ' seconds remaining...';
        d--;
        if (d < 0) {
            clearInterval(inter);
            requestSend();
            downl.style.display = 'inline';
            t.value = key;
        }
    },1000);
}

playbtn.addEventListener('click', ()=>{
    player.playVideo();
    changeScreenDetect();
    timer();
});
pausebtn.addEventListener('click', ()=>{
    d = 5;
    clearInterval(inter);
    t.value = 'timer';
    player.stopVideo();
});
