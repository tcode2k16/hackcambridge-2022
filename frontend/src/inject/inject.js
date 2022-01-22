function inject(injection_script) {
    injection_script = '(' + injection_script.toString().split('\n').filter(l => !l.trim().substring(0, 2).includes('//')).join('\n') + ')();';
    location.href = "javascript: " + injection_script;
}

// var iframe  = document.createElement ('iframe');
// iframe.src  = chrome.runtime.getURL ('popup.html');
// document.body.appendChild (iframe);
const popup_url = chrome.runtime.getURL("popup.html");
console.log('hello world');
function addPopup() {
    
    var iframe  = document.createElement('iframe');
    iframe.src  = popup_url;
    iframe.className = 'hack-popup';

    document.body.innerHTML += `<style>
    .hack-popup { 
        position: absolute;
        top: 8px;
        left: 16px;
        width: 100px;
        height: 100px;
        border-width: 0px;
        border-style: none;
        z-index: 1000;
        border-radius: 10rem;
    }</style>
    `;
    document.body.appendChild(iframe);

    var mousePosition;
    var offset = [0,0];
    var div;
    var isDown = false;

    div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = "16px";
    div.style.top = "8px";
    div.style.width = "10px";
    div.style.height = "10px";
    div.style.background = "red";
    div.style.color = " ";
    div.style.zIndex = 1000;
    div.style.borderRadius = "10rem";
    
    document.body.appendChild(div);

    div.addEventListener('mousedown', function(e) {
        isDown = true;
        offset = [
            div.offsetLeft - e.clientX,
            div.offsetTop - e.clientY
        ];
    }, true);

    document.addEventListener('mouseup', function() {
        isDown = false;
    }, true);

    document.addEventListener('mousemove', function(event) {
        event.preventDefault();
        if (isDown) {
            mousePosition = {
    
                x : event.clientX,
                y : event.clientY
    
            };
            div.style.left = (mousePosition.x + offset[0]) + 'px';
            div.style.top  = (mousePosition.y + offset[1]) + 'px';
            iframe.style.left = (mousePosition.x + offset[0]) + 'px';
            iframe.style.top  = (mousePosition.y + offset[1]) + 'px';
        }
    }, true);   

}


addPopup();
console.log(document);
// inject(function () {
    
//     //   addPopup('abc', {
//     //       keywords: ['abc','111'],
//     //   });
// })
