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
    document.body.appendChild (iframe);
    document.body.innerHTML += `<style>
    .hack-popup { 
        position: absolute;
        top: 8px;
        right: 16px;
        border-width: 0px;
        border-style: none;
        z-index: 1000;
        border-radius: 0.5rem;
    }</style>`;

}
addPopup();
console.log(document);
// inject(function () {
    
//     //   addPopup('abc', {
//     //       keywords: ['abc','111'],
//     //   });
// })