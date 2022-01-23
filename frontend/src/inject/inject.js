const api_key = 'AIzaSyB6noPbBUa74kWRKnsX3dCyPxXqRAvuBhA';

function inject(injection_script) {
    injection_script = '(' + injection_script.toString().split('\n').filter(l => !l.trim().substring(0, 2).includes('//')).join('\n') + ')();';
    location.href = "javascript: " + injection_script;
}

async function factCheck() {
    let query = document.title;
    if (query.indexOf('Twitter') >= 0) {
        query = query.split('Twitter: "')[1]
    }

    let r = await fetch(`https://factchecktools.googleapis.com/v1alpha1/claims:search?key=${api_key}&query=${query}`);
    let j = await r.json();
    console.log(r);
    console.log(j);

}


// var iframe  = document.createElement ('iframe');
// iframe.src  = chrome.runtime.getURL ('popup.html');
// document.body.appendChild (iframe);
const popup_url = chrome.runtime.getURL("popup.html");
function old_addPopup(text, result) {
    const w = 600;
    const h = 650;
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 + dualScreenLeft;
    const top = (height - h) / 2 + dualScreenTop;
    console.log(width);
    console.log(height);
    console.log(left);
    console.log(top);
    console.log("width=" + ((w) | 0) + ", height=" + ((h) | 0) + ", top=" + ((top) | 0) + ", left=" + (left | 0));
    const newWindow = window.open('', 'checker', "width=" + ((w) | 0) + ",height=" + ((h) | 0) + ",top=" + ((top) | 0) + ",left=" + (left | 0)+',location=no,status=no,titlebar=no,toolbar=no,menubar=no');
    newWindow.document.body.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    
    <body>
      <style>
        body {
          background-color: #030303;
          color: rgba(255, 255, 255, 1.00);
        }
    
        .popup-container {
          position: absolute;
          top: 0px;
          bottom: 0px;
          left: 0px;
          right: 0px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #030303;
          color: rgba(255, 255, 255, 1.00);
          /* font-size: 15px; */
          font: 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
    
        .popup-root {
          background-color: #1A1A1B;
          border-radius: 16px;
          max-width: 95vw;
          /* min-width: 600px; */
          width: 100%;
          max-height: 95vh;
          min-height: 400px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          overflow: hidden;
        }
    
        .bird {
          height: 2rem;
        }
    
        .top {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 53px;
        }
    
    
        .bottom {
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;
          align-items: center;
          height: 100%;
          margin-left: 32px;
          margin-right: 32px;
          margin-bottom: 32px;
        }
    
        .disabled {
          animation: ease-in;
          opacity: 0.65;
          cursor: not-allowed;
        }
        .title {
          text-align: center;
        }
    
        .button {
          animation: timer 10s;
          animation-timing-function: linear;
          cursor: pointer;
          margin-top: 12px;
          box-sizing: border-box;
          min-height: 40px;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.00);
          border-color: rgba(0, 0, 0, 0.00);
          color: rgb(255, 255, 255);
          border-style: solid;
          border-radius: 9999px;
          padding-top: 1em;
          padding-bottom: 1em;
          font-weight: 700;
          font-size: 15px;
          display: flex;
          justify-content: center;
          text-align: center;
          outline: none;
          position: relative;
          z-index: 0;
          overflow: hidden;
        }
    
        .button::before {
          animation: timer 10s;
          animation-timing-function: linear;
          content: '';
          cursor: pointer;
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          margin-top: 12px;
          box-sizing: border-box;
          min-height: 40px;
          
          background-color: #ff8717;
          border-color:  #ff8717;
          color: rgb(255, 255, 255);
          border-style: solid;
          border-radius: 9999px;
          padding-top: 1em;
          padding-bottom: 1em;
          font-weight: 700;
          font-size: 15px;
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          outline: none;
          z-index: -2;
    
        }
    
        .button::after {
          animation: color_timer 10s;
          animation-timing-function: linear;
          cursor: pointer;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 100%;
          /* position: absolute; */
          
          
          background-color: #ff4500;
          border-color: #ff4500;
          transition: all .3s;
          cursor: pointer;
          margin-top: 12px;
          box-sizing: border-box;
          min-height: 40px;
          border-style: solid;
          border-radius: 9999px;
          padding-top: 1em;
          padding-bottom: 1em;
          font-weight: 700;
          font-size: 15px;
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          outline: none;
    
          z-index: -1;
        }
    
        .button span {
          position: relative;
          transition: 0.5s;
        }
    
        .button span:after {
          animation: timer 10s;
          cursor: pointer;
          content: '>>';
          position: absolute;
          opacity: 0;
          top: 0;
          right: -20px;
          transition: 0.5s;
        }
    
        .button.enabled:hover span {
          padding-right: 25px;
        }
    
        .button.enabled:hover span:after {
          opacity: 1;
          right: 0;
        }
    
        .button_2 {
          margin-top: 12px;
          box-sizing: border-box;
          min-height: 40px;
          background-color: rgba(0, 0, 0, 0);
          background-color: #d7dadc;
          border-color: #d7dadc;
          color: rgb(26, 26, 27);
          border-style: solid;
          border-radius: 9999px;
          padding-top: 1em;
          padding-bottom: 1em;
          font-weight: 700;
          font-size: 15px;
          width: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          outline: none;
        }
    
        .button_2 span {
          cursor: pointer;
          position: relative;
          transition: 0.5s;
        }
    
        .button_2 span:after {
          content: '<<';
          position: absolute;
          opacity: 0;
          top: 0;
          left: -20px;
          transition: 0.5s;
        }
    
        .button_2:hover span {
          padding-left: 25px;
        }
    
        .button_2:hover span:after {
          opacity: 1;
          left: 0;
        }
    
        .input-text {
          color: rgba(255, 255, 255, 1.00);
          /* font-size: 15px; */
          font: 19px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          margin-top: 30px;
          margin-bottom: 30px;
        }
    
        @keyframes timer {
          from {
            cursor: not-allowed;
          }
    
          95% {
            cursor: not-allowed;
          }
    
          to {
            cursor: pointer;
          }
        }
    
        @keyframes color_timer {
          from {
            width: 0;
            cursor: not-allowed;
          }
          to {
            width: 100%;
            cursor: not-allowed;
          }
        }
        .tooltip {
          /* position: relative; */
          display: inline;
          border-bottom: 1px solid white; /* If you want dots under the hoverable text */
          display: inline-block;
        }
        
        /* Tooltip text */
        .tooltip .tooltiptext {
          visibility: hidden;
          width: 100vw;
          background-color: black;
          color: #fff;
          text-align: center;
          padding: 5px 0;
          border-radius: 6px;
          bottom: 0px;
          left: 0px;
          right: 0px;
         
          /* Position the tooltip text - see examples below! */
          position: absolute;
          z-index: 1;
        }
        
        /* Show the tooltip text when you mouse over the tooltip container */
        .tooltip:hover .tooltiptext {
          visibility: visible;
        }
    
      </style>
      <div class="popup-container">
        <div class="popup-root">
          <div class="top">
          <svg class="bird" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="_1O4jTk-dZ-VIxsCuYB6OR8"><g><circle fill="#FF4500" cx="10" cy="10" r="10"></circle><path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23A1.46,1.46,0,1,0,4.2,11.33a2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path></g></svg>
            
          </div>
    
          <div class="bottom">
            <!-- <div class="timer"></div>
            <h1>Summary of what the user sent</h1>
            <h1>NAh bro</h1> -->
            <h1 class="title">Are you sure you want to send this?</h1>
            <p class="input-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id dui eu augue pharetra
              condimentum eget sed diam. Sed augue diam, ullamcorper non purus vel, consequat venenatis sapien.
            </p>
            <button class="button"><span>Send </span></button>
            <button class="button_2"><span>Back </span></button>
          </div>
        </div>
      </div>
    </body>
    
    </html>`;
    // const newWindow = window.open('https://google.com', 'checker', "width=100,height=100");
    console.log(newWindow);
    if (window.focus) newWindow.focus();

    newWindow.document.body.onload = function () {
      console.log('hello');
      setTimeout(() => {
        console.log('hello');
        newWindow.document.getElementsByClassName('button')[0].classList.add('enabled');
        newWindow.enabled = true;
      }, 10 * 1000);
    };

    let output = text;
    for (let each of Object.keys(result.keywords)) {
      let idx = 0;
      while (output.toLowerCase().indexOf(each.toLowerCase(), idx) >= 0) {
        let loc = output.toLowerCase().indexOf(each.toLowerCase(), idx);
        tmp = output.substring(0, loc) + `<span class="tooltip">${output.substring(loc, loc + each.length)}${result.keywords[each].definition.trim().length > 0 ? '<span class="tooltiptext">'+result.keywords[each].definition.trim()+'</span>' : ''}</span>`;
        idx = tmp.length;
        tmp += output.substring(loc + each.length);
        output = tmp;
      }
      console.log(output);
    }
    console.log(output);
    newWindow.document.getElementsByClassName('input-text')[0].innerHTML = output;
    console.log(newWindow.document.getElementsByClassName('button'));
    newWindow.document.getElementsByClassName('button')[0].onclick = function (e) {
      if (newWindow.enabled) {
        console.log(window);
        // console.log(window.opener);
        // console.log(window.opener.send_tweet);
        window.send_tweet();
        newWindow.close();
      }

    };

    newWindow.document.getElementsByClassName('button_2')[0].onclick = function () {
      console.log(window);

      newWindow.close();
    };


  }

var isDown = false;
var move_div, close_div, iframe;

let height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
const iframe_padding = [10, Math.floor((height-400)/2)];
const move_button_padding = [25, 10];
const close_button_padding = [10, 10];
const open_button_padding = [10, 10];
function updatePopupPos(mousePosition) {
    console.log(mousePosition);
    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    move_div.style.right = (width-(mousePosition.x)) + 'px';
    move_div.style.top  = (mousePosition.y) + 'px';
    close_div.style.right = (width-(mousePosition.x)-move_button_padding[0]+close_button_padding[0]) + 'px';
    close_div.style.top  = (mousePosition.y)-move_button_padding[1]+close_button_padding[1] + 'px';
    open_div.style.right = (width-(mousePosition.x)-move_button_padding[0]+open_button_padding[0]) + 'px';
    open_div.style.top  = (mousePosition.y)-move_button_padding[1]+open_button_padding[1] + 'px';
    iframe.style.right = (width-(mousePosition.x)-move_button_padding[0]) + 'px';
    iframe.style.top  = (mousePosition.y)-move_button_padding[1] + 'px';
}

function addPopup() {
    
    // let container = document.createElement('div');
    // container.className = 'hack-popup-container';

    iframe  = document.createElement('iframe');
    iframe.src  = popup_url;
    iframe.className = 'hack-popup';

    document.body.innerHTML += `<style>
    .hack-popup { 
        position: fixed;
        top: ${iframe_padding[1]}px;
        left: auto;
        right: ${iframe_padding[0]}px;
        width: 300px;
        height: 400px;
        border-width: 0px;
        border-style: none;
        z-index: 99999999;
        border-radius: 0.75rem;
        filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
        
    }
    
    </style>
    `;
    document.body.appendChild(iframe);


    var mousePosition;
    var offset = [0,0];
    
    move_div = document.createElement("div");
    move_div.style.position = "fixed";
    move_div.style.left = "auto";
    move_div.style.right = (iframe_padding[0]+move_button_padding[0])+"px";
    move_div.style.top = (iframe_padding[1]+move_button_padding[1])+"px";
    move_div.style.width = "10px";
    move_div.style.height = "10px";
    move_div.style.background = "green";
    move_div.style.color = " ";
    move_div.style.zIndex = 99999999;
    move_div.style.borderRadius = "10rem";
    move_div.style.cursor = 'grad';
    
    document.body.appendChild(move_div);

    close_div = document.createElement("div");
    close_div.style.position = "fixed";
    close_div.style.left = "auto";
    close_div.style.right = (iframe_padding[0]+close_button_padding[0])+"px";
    close_div.style.top = (iframe_padding[1]+close_button_padding[1])+"px";
    close_div.style.width = "10px";
    close_div.style.height = "10px";
    close_div.style.background = "red";
    close_div.style.color = " ";
    close_div.style.zIndex = 99999999;
    close_div.style.borderRadius = "10rem";
    close_div.style.cursor = 'grad';
    
    document.body.appendChild(close_div);

    open_div = document.createElement("div");
    open_div.style.position = "fixed";
    open_div.style.left = "auto";
    open_div.style.right = (iframe_padding[0]+open_button_padding[0])+"px";
    open_div.style.top = (iframe_padding[1]+open_button_padding[1])+"px";
    open_div.style.width = "10px";
    open_div.style.height = "10px";
    open_div.style.background = "red";
    open_div.style.color = " ";
    open_div.style.zIndex = 99999999;
    open_div.style.borderRadius = "10rem";
    open_div.style.cursor = 'grad';

    // document.body.appendChild(container);

    move_div.addEventListener('mousedown', function(e) {
        isDown = true;
        // offset = [
        //     div.offsetLeft - e.clientX,
        //     div.offsetTop - e.clientY
        // ];
    }, true);


    close_div.addEventListener('click', function() {
        console.log('clicked');
        close_div.remove();
        iframe.style.width = "100px";
        iframe.style.height = "100px";
        iframe.style.borderRadius = "10rem";
        document.body.appendChild(open_div);
    });

    open_div.addEventListener('click', function() {
      console.log('clicked');
      open_div.remove();
      iframe.style.width = "300px";
      iframe.style.height = "400px";
      iframe.style.borderRadius = "0.75rem";
      document.body.appendChild(close_div);
      document.body.appendChild(move_div);
  });

    document.addEventListener('mouseup', function() {
        console.log('up');
        if (isDown) {
            isDown = false;
        }
    }, true);


    document.addEventListener('mousemove', function(event) {
        if (isDown) {
            event.preventDefault();

            
            mousePosition = {
    
                x : event.clientX,
                y : event.clientY
    
            };
            // console.log((width-(mousePosition.x + offset[0])));
            updatePopupPos(mousePosition);
        }
    }, true);

    window.addEventListener('resize', function(event) {
        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
            
        move_div.style.right = Math.min(parseInt(move_div.style.right.slice(0, -2)), width-300+move_button_padding[0])+'px';
        close_div.style.right = Math.min(parseInt(close_div.style.right.slice(0, -2)), width-300+close_button_padding[0])+'px';
        open_div.style.right = Math.min(parseInt(open_div.style.right.slice(0, -2)), width-300+open_button_padding[0])+'px';
        iframe.style.right = Math.min(parseInt(iframe.style.right.slice(0, -2)), width-300)+'px';

        console.log(event);
    }, true);

    /*
    div2 = document.createElement("div");
    div2.style.position = "fixed";
    div2.style.left = "auto";
    div2.style.right = "8px";
    div2.style.top = "108px";
    div2.style.width = "10px";
    div2.style.height = "10px";
    div2.style.background = "blue";
    div2.style.color = " ";
    div2.style.zIndex = 99999999;
    div2.style.borderRadius = "10rem";
    div2.style.cursor = 'grad';

    document.body.appendChild(div2);

    div2.addEventListener('mousedown', function(e) {
        document.getElementById('iframe').contentWindow.startTimer();
    }, true);
    */
}

document.addEventListener("readystatechange", async function(event){
    if (event.target.readyState === "complete") {
        // alert("hi 2");
    
        if (['tailwindcss.com', 'discord.com', 'devpost.com'].every(e => location.hostname.indexOf(e) < 0)) {
            chrome.runtime.sendMessage({type: "esg", data: document.body.innerText}, function(response) {
                console.log(response);
            });
            
            setTimeout(async function() {
                console.log('hello world');
                console.log(document.title);
                await factCheck();    
                

                
                console.log(document);

            }, 2000);
            addPopup();
        }
        
    }
});


chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg, sender, sendResponse) {
    console.log(msg);
    console.log(isDown);
    // console.log(sender);
    if (msg.type === 'stopMove') {
        if (isDown) {
            isDown = false;
        }
        sendResponse(true);
    } else if (msg.type === 'mouseMove') {
        if (isDown) {
            let {x,y} = msg.data;
            const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            
            

            updatePopupPos({
                x:width-parseInt(iframe.style.right.slice(0, -2))-300+x,
                y:parseInt(iframe.style.top.slice(0, -2))+y,
            });
        }
        sendResponse(true);
    }
}

// chrome.runtime.onMessage.addListener(messageReceived);

// function messageReceived(msg, sender, sendResponse) {

//     console.log(msg);
   
// }


// inject(function () {
    
//     //   addPopup('abc', {
//     //       keywords: ['abc','111'],
//     //   });
// })
