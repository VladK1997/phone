/**
 * Zvonilovo landing
 *
 * Frontend developer: Vladyslav Kukhlii
 *
 * Released on: February 25, 2020
 */

(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    let opportCanvas = document.getElementById('opport');
    let balls = [];
    let iterator = 0;
    let ctx = opportCanvas.getContext("2d");
    const colors =['#805083','#6bc273','#caf7ca'];
    const minMax = [-1,1];
    const maxDev = 30;
    let pauseTime = 5000;//time between animation, for imaged dots
    let pauseTimeHidden = 1000;//dots hidden,for this time, after this iinterval will start animation
    opportCanvas.width = opportCanvas.offsetWidth;
    opportCanvas.height = opportCanvas.offsetHeight;
    let canvasWidth = opportCanvas.width;
    let canvasHeight = opportCanvas.height;
    let centerX =  canvasWidth/2;
    let centerY = canvasHeight/2;
    let currentFrame;
    let currentInterval;
    let currentTimeOut;
    let currentFunc = '';
    function startIntFunc() {
        for(let i = 0,l = 50; i < l; i++){
            balls.push({
                color: colors[Math.round(Math.random() * 2)],
                size: Math.round(Math.random() * 16),
                xCord: Math.round(Math.random() * centerX * minMax[Math.round(Math.random()*1)]),
                yCord: Math.round(Math.random() * centerY * minMax[Math.round(Math.random()*1)])
            })
        }
        opportCanvas.style.opacity = 1;
        currentInterval = setInterval(function () {
            currentFrame = requestAnimationFrame(drawStart);
        },maxDev);
    }
    function backIntFunc() {
        currentInterval = setInterval(function(){
            currentFrame = requestAnimationFrame(drawBack);
        } ,maxDev);
    }
    function drawStart(){
        currentFunc = 'start';
        if(iterator < maxDev){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            for (let i = 0,l = balls.length; i < l; i++){
                ctx.beginPath();
                ctx.arc(centerX + (balls[i].xCord/maxDev*iterator), centerY +(balls[i].yCord/maxDev)*iterator, balls[i].size, 360, Math.PI * 2, true);
                ctx.fillStyle = balls[i].color;
                ctx.fill();
            }
            ++iterator;
        }else {
            clearInterval(currentInterval);
            cancelAnimationFrame(currentFrame);
            currentTimeOut = setTimeout(function (){
                backIntFunc();
            },pauseTime);
        }
    }
    function drawBack() {
        currentFunc = 'back';
        if(iterator > 1){
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            for (let i = 0,l = balls.length; i < l; i++){
                ctx.beginPath();
                ctx.arc(centerX + (balls[i].xCord/maxDev*iterator), centerY +(balls[i].yCord/maxDev)*iterator, balls[i].size, 360, Math.PI * 2, true);
                ctx.fillStyle = balls[i].color;
                ctx.fill();
            }
            --iterator;
        }else {
            clearInterval(currentInterval);
            opportCanvas.style.opacity = 0;
            cancelAnimationFrame(currentFrame);
            currentTimeOut = setTimeout(function (){
                balls = [];
                startIntFunc();
            },pauseTimeHidden);
        }
    }
    document.addEventListener('visibilitychange',function(){
        console.log(document.visibilityState);
        if(document.visibilityState =='hidden'){
            clearTimeout(currentTimeOut);
            clearInterval(currentInterval);
            cancelAnimationFrame(currentFrame);

        }else if(document.visibilityState =='visible'){
            startIntFunc();
        }
    });
    startIntFunc();
})();
(function () {
    let whomSlider = document.querySelector('.toWhom__slider');
    if(whomSlider && window.innerWidth < 768) {
        let articlesSlider = new Swiper(whomSlider, {
            slidesPerView: 2,
            slidesPerColumn:2,
            initialSlide: 0,
            spaceBetween: 20,
            autoplay: true,
            pagination: {
                el: '.toWhom__pag',
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 1,
                    slidesPerColumn:2,
                }
            }
        });
    }
})();
(function () {
    const revPop = document.getElementById("revPop");
    const revPopOpenBtnAttr = "data-revOpenBtnAttr";
    let ClosePopup = function (popup) {
        let self = this;
        if(popup){
            self.popup = popup;
            self.popup.addEventListener("click", function(e){
                if(e.target.hasAttribute("data-closepopup")){
                    self.popup.classList.remove("active");
                }
            })
        }
    }
    if(revPop){
        let img = revPop.querySelector('img');
        window.addEventListener("click",function(e){
            if (e.target.hasAttribute(revPopOpenBtnAttr)){
                openPopup(revPop);
                img.src = e.target.src;
            }
        })
    }
    function openPopup(popup){
        popup.classList.add("active");
    }
    if(revPop){
        let userAgreePopup = new ClosePopup(revPop)
    }
})();