const MAX_ITEM_NUM = 4;
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
images.push(new Image());
images[0].src = 'src/pictures/walking1.png';
images.push(new Image());
images[1].src = 'src/pictures/walking2.png';
images.push(new Image());
images[2].src = 'src/pictures/walking3.png';
images.push(new Image());
images[3].src = 'src/pictures/walking4.png';

let sleepImg = new Image();
sleepImg.src = 'src/pictures/fox2.png';

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

let fox, animationInterval, animationCounter = 0, foxOffset = 0, foxDirection = -1;
async function startWalking() {
    console.log('hover');
    // animationCounter = 0;
    // foxOffset = 0;
    // foxDirection = -1;

    
    fox = document.getElementById('hack-fox');

    fox.style.transition = 'opacity 0.3s';
    fox.style.opacity = 0;
    await sleep(300);
    
    if (animationInterval) { clearInterval(animationInterval); animationInterval = undefined; }
    animationInterval = setInterval(async () => {
        fox.src = images[animationCounter].src;
        // first call
        if (fox.style.transition) {
            await sleep(300);
            fox.style.opacity = 1;
            fox.style.transition = '';
        }

        animationCounter = (animationCounter+1)%4;
        console.log(`translate(${foxOffset}px,0px);`);
        fox.style.transform = `translate(${foxOffset}px,0px)`+(foxDirection<0 ? '' : ' scaleX(-1)');
        foxOffset+=5*foxDirection;
        if (foxOffset < -150) {
            foxDirection = 1;
        } else if (foxOffset > -10) {
            foxDirection = -1;
        }
    }, 200);
    
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function stopWalking() {
    console.log('out');

    if (animationInterval) { clearInterval(animationInterval); animationInterval = undefined; }

    fox.style.transition = 'opacity 0.3s';
    fox.style.opacity = 0;
    await sleep(300);
    fox.src = sleepImg.src;
    await sleep(300);
    fox.style.opacity = 1;
    await sleep(300);
    fox.style.transition = '';
    await sleep(300);
    if (animationInterval) { clearInterval(animationInterval); animationInterval = undefined; }

}



let clickList = {};
let data,i;
window.addEventListener('DOMContentLoaded',  function() {
    document.getElementsByClassName('play')[0].onclick = function() {startTimer();}
    let companyName = document.getElementById('CompanyName');
    let ratingEl = document.getElementById('Rating');
    let RatingText = document.getElementById('RatingText');
    let articleList = document.getElementById('ArticleList');
    let sidebar = document.getElementById('sidebar');
    let CompanyUi = document.getElementById('CompanyUi');
    let FactLink = document.getElementById('FactLink');
    let FakeNews = document.getElementById('FakeNews');
    let FakeAttr = document.getElementById('FakeAttr');
    let Source = document.getElementById('Source');
    let Reason = document.getElementById('Reason');
    
    let FactUi = document.getElementById('FactUi');
    
    function switchTo(i) {
        if (data[i].isFact) {
            CompanyUi.style.display = 'none';
            FactUi.style.display = 'block';
            let o = data[i];

            FakeNews.innerText = o.text;
            FakeAttr.innerText = `By ${o.claimant}`;
            Source.innerText = o.claimReview[0].publisher.name;
            Reason.innerText = o.claimReview[0].textualRating;


            Array.prototype.forEach.call(document.querySelectorAll(".hack-articles"), function (e) { e.addEventListener('mouseover', function() {startWalking()}); e.addEventListener('mouseout', function() {stopWalking()}) });

        } else {
            CompanyUi.style.display = 'block';
            FactUi.style.display = 'none';

            let {name, rating, articles} = data[i];

            console.log(`switching to ${name}`);
            companyName.innerText = name;


            Array.prototype.forEach.call(document.querySelectorAll(".hack-item"), function (e) { if (e.id.slice(4) === i+'') {e.classList.add('bg-slate-200')} else {e.classList.remove('bg-slate-200')} });


            articleList.innerHTML = '';
            for (let each of articles) {
                let [name, url] = each;
                articleList.innerHTML += `
                <li><a href="${url}" target="__blank" class="hack-articles text-sky-500">${name}</a></li>
                `;
            }

            Array.prototype.forEach.call(document.querySelectorAll(".hack-articles"), function (e) { e.addEventListener('mouseover', function() {startWalking()}); e.addEventListener('mouseout', function() {stopWalking()}) });

            RatingText.innerText = RatingText.innerText.split(':')[0] + ': ' + rating;
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
        

    }

    function click_handler() {
        switchTo(parseInt(this.id.slice(4)));
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "getData" }, function(res) {
            data = res.slice(0,MAX_ITEM_NUM);
            // sidebar
            console.log(res);

            // i = 0;
            
            if (data.length > 1) {
                for (let i = 0; i < data.length; i++) {
                    let each = data[i];
                    console.log(each);
                    sidebar.innerHTML += `
                    <div id="item${i}" class="hack-item border-slate-300 hover:bg-slate-100	w-10 h-full flex flex-col justify-center border-y">
                        <h1 class="transform -rotate-90 overflow-hidden w-18 -m-4 whitespace-nowrap">${each.isFact ? each.text.split(' ')[0] : each.name.split(' ')[0]}</h1>
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
            }
            

            switchTo(0);
        });
    });
});

