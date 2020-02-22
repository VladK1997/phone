(function () {
    let opportCanvas = document.getElementById('opport');
    let balls = [];
    let iterator = 0;
    let ctx = opportCanvas.getContext("2d");
    const colors =['#805083','#6bc273','#caf7ca'];
    const minMax = [-1,1];
    let maxDev = 30;
    let pauseTime = 5000;//time between animation, for imaged dots
    let pauseTimeHidden = 500;//dots hidden,for this time, after this iinterval will start animation
    let centerX = opportCanvas.offsetWidth/7;
    let centerY = opportCanvas.offsetHeight/7;
    let startInt;
    let backInt;
    let frame;
    function startIntFunc() {
        for(let i = 0,l = 50; i < l; i++){
            balls.push({
                color: colors[Math.round(Math.random() * 2)],
                size: Math.round(Math.random() * 4),
                xCord: Math.round(Math.random() * opportCanvas.offsetWidth/7 * minMax[Math.round(Math.random()*1)]),
                yCord: Math.round(Math.random() * opportCanvas.offsetHeight/7 * minMax[Math.round(Math.random()*1)])
            })
        }
        opportCanvas.style.opacity = 1;
        startInt = setInterval(function () {
            frame = window.requestAnimationFrame(drawStart);
        },maxDev);
    }
    function backIntFunc() {
        backInt = setInterval(function(){
            frame = window.requestAnimationFrame(drawBack);
        } ,maxDev);
    }

    function drawStart(){
        if(iterator <= maxDev){
            ctx.clearRect(0, 0, opportCanvas.offsetWidth, opportCanvas.offsetHeight);
            // console.log(opportCanvas.offsetWidth,centerX);
            for (let i = 0,l = balls.length; i < l; i++){
                ctx.beginPath();
                ctx.arc(centerX + (balls[i].xCord/maxDev*iterator), centerY +(balls[i].yCord/maxDev)*iterator, balls[i].size, 360, Math.PI * 2, true);
                ctx.fillStyle = balls[i].color;
                ctx.fill();
            }
            iterator++;
            console.log(maxDev);
        }else {
            clearInterval(startInt);
            cancelAnimationFrame(frame);
            setTimeout(function (){
                backIntFunc();
            },pauseTime);
        }
    }
    function drawBack() {
        if(iterator > 0){
            ctx.clearRect(0, 0, opportCanvas.offsetWidth, opportCanvas.offsetHeight);
            // console.log(opportCanvas.offsetWidth,centerX);
            for (let i = 0,l = balls.length; i < l; i++){
                ctx.beginPath();
                ctx.arc(centerX + (balls[i].xCord/maxDev*iterator), centerY +(balls[i].yCord/maxDev)*iterator, balls[i].size, 360, Math.PI * 2, true);
                ctx.fillStyle = balls[i].color;
                ctx.fill();
            }
            --iterator;
            console.log(iterator);
        }else {
            clearInterval(backInt);
            opportCanvas.style.opacity = 0;
            cancelAnimationFrame(frame);
            setTimeout(function (){
                balls = [];
                startIntFunc();
            },pauseTimeHidden);
        }
    }
    startIntFunc();
    // function draw() {
    //         for (var i = 0; i < 4; i++) {
    //             for (var j = 0; j < 3; j++) {
    //                 ctx.beginPath();
    //                 var x = 25 + j * 50; // x coordinate
    //                 var y = 25 + i * 50; // y coordinate
    //                 var radius = 20; // Arc radius
    //                 var startAngle = 0; // Starting point on circle
    //                 var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
    //                 var anticlockwise = i % 2 !== 0; // clockwise or anticlockwise
    //
    //                 ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    //
    //                 if (i > 1) {
    //                     ctx.fill();
    //                 } else {
    //                     ctx.stroke();
    //                 }
    //             }
    //         }
    //
    // }

})();