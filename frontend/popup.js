console.log('hello world');
// chrome.runtime.sendMessage({ type: "abcde", data: 'abc' }, function (response) {

// })
document.addEventListener('mouseup', function (e) {
    // chrome.runtime.sendMessage({ type: "abcde", data: 'abc' }, function (response) {

    // })
    console.log(e.target);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, { type: "stopMove" }, function (response) {
            console.log(response);
        });
    });

    // if (clickList[e.target]) 

    return true;
}, true);


document.addEventListener('mousemove', function(event) {
    
    let mousePosition = {

        x : event.clientX,
        y : event.clientY

    };

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, { type: "mouseMove", data: mousePosition });
    });
}, true);


var images = new Array();
var x = 0;
var repeat;
images[0] = new Image();
images[0].src = 'src/pictures/image1.png';
images[1] = new Image();
images[1].src = 'src/pictures/image2.png';
images[2] = new Image();
images[2].src = 'src/pictures/image3.png';

function displayImage() {
    if(x == 0) {
        document.getElementById("img").src = images[0].src;
        x = 1;
    } else if(x == 1){
        document.getElementById("img").src = images[1].src;
        x = 2;
    } else {
        document.getElementById("img").src = images[2].src;
        x = 0;
        clearInterval(repeat);
    }
    
}

function startTimer() {
    repeat = setInterval(displayImage, 500);
}



let clickList = {};
let data,i;
window.addEventListener('DOMContentLoaded',  function() {
    document.getElementsByClassName('play')[0].onclick = function() {startTimer();}
    let companyName = document.getElementById('CompanyName');
    let ratingEl = document.getElementById('Rating');
    let articleList = document.getElementById('ArticleList');
    let sidebar = document.getElementById('sidebar');
    function switchTo(i) {
        let {name, rating, articles} = data[i];

        console.log(`switching to ${name}`);
        companyName.innerText = name;


        Array.prototype.forEach.call(document.querySelectorAll(".hack-item"), function (e) { if (e.id.slice(4) === i+'') {e.classList.add('bg-slate-200')} else {e.classList.remove('bg-slate-200')} });


        articleList.innerHTML = '';
        for (let each of articles) {
            let [name, url] = each;
            articleList.innerHTML += `
            <li><a href="${url}" target="__blank" class="text-sky-500">${name}</a></li>
            `;
        }

        for (let i = 1; i <= 5; i++) {
            document.getElementById(`hack-rating-${i}`).classList.remove('border-2');
        }
        console.log(rating);
        if (rating < 10) {
            document.getElementById(`hack-rating-1`).classList.add('border-2');
        } else if (rating < 20) {
            document.getElementById(`hack-rating-2`).classList.add('border-2');
        } else if (rating < 30) {
            document.getElementById(`hack-rating-3`).classList.add('border-2');
        } else if (rating < 40) {
            document.getElementById(`hack-rating-4`).classList.add('border-2');
        } else {
            document.getElementById(`hack-rating-5`).classList.add('border-2');
        }

    }

    function click_handler() {
        switchTo(parseInt(this.id.slice(4)));
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "getData" }, function(res) {
            data = res;
            // sidebar
            console.log(res);

            // i = 0;
            for (let i = 0; i < res.length; i++) {
                let each = res[i];
                console.log(each);
                sidebar.innerHTML += `
                <div id="item${i}" class="hack-item border-slate-300 hover:bg-slate-100	w-10 h-full flex flex-col justify-center border-y">
                    <h1 class="transform -rotate-90 overflow-hidden w-18 -m-4 whitespace-nowrap">${each.name.split(' ')[0]}</h1>
                </div>
                `;
                // clickList[sidebar.lastElementChild] = function() {
                //     console.log('clicked');
                //     switchTo(each);
                // }
                
                // console.log(document.getElementById(`item${i}`));
                // document.getElementById(`item${i}`).addEventListener('click', getCb(i));
                // i+=1;
                // console.log(sidebar.lastElementChild.firstElementChild.onclick);

            }
            Array.prototype.forEach.call(document.querySelectorAll(".hack-item"), function (e) { console.log(e); e.addEventListener("click", click_handler) });
            console.log(sidebar.firstChild);
            sidebar.firstElementChild.classList.toggle('border-b');
            sidebar.firstElementChild.classList.toggle('border-y');
            sidebar.lastElementChild.classList.toggle('border-t');
            sidebar.lastElementChild.classList.toggle('border-y');

            switchTo(0);
        });
    });
});