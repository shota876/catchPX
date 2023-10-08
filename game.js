document.addEventListener('DOMContentLoaded', () => {
    let elements = {
        game: document.querySelector('.game'),
        firsDesk: document.querySelector('.desk-1'),
        ball: document.querySelector('.ball'),
        secondDesk: document.querySelector('.desk-2'),
        topWall: document.querySelector('.top-wall'),
        bottomWall: document.querySelector('.bottom-wall'),
        leftWall: document.querySelector('.left-wall'),
        rightWall: document.querySelector('.right-wall'),
        overEl: document.querySelector('.game-over'),
        leftScoreEl: document.querySelector('.left-score'),
        rightScoreEl: document.querySelector('.right-score'),
        startAgainBtn: document.querySelector('.start-again'),
        startGameBtn: document.querySelector('.play')
    }

    let gameWidth = elements.game.getBoundingClientRect().width
    let hameHeight = elements.game.getBoundingClientRect().height
    let styleRoot = document.querySelector(':root')
    let leftScore = 0
    let rightScore = 0
    let enableUpdate = false
    let ballPhisycs = {
        x: getStyleProperty('--ball-left'),
        y: getStyleProperty('--ball-top'),
        w: elements.ball.getBoundingClientRect().width,
        h: elements.ball.getBoundingClientRect().height,
        vx: 3,
        vy: 2,
        speed: 1.5
    }

    

// get style from :root
function setStyleProperty(variable, value) {
    styleRoot.style.setProperty(variable, value)
}

function getStyleProperty(variable){
    return parseFloat(getComputedStyle(styleRoot).getPropertyValue(variable))
}


defData()
requestAnimationFrame(update)


//start Game
function startGame(){
    elements.startGameBtn.addEventListener('click', () => {
       enableUpdate = true 
       elements.startGameBtn.style.display = 'none'
    })
}

function update(){
    startGame()
    if(!enableUpdate) {requestAnimationFrame(update)}
    else{
    checkGameOver()
    ballCatchFirstDesk()
    ballCatchSecondDesk()
    requestAnimationFrame(update)        
    }

}

function defData(){
    console.log(ballPhisycs)
}


// ball moves and desk catches

    // first desk
function ballCatchFirstDesk(){
    if(collision(elements.firsDesk.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        let random = randomNum(2)
        if(random == 1){
            ballPhisycs.vx *= -1
            ballPhisycs.vy *= 1            
        }else{
            ballPhisycs.vx *= -1
            ballPhisycs.vy *= -1
        }

    }else if(collision(elements.rightWall.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        console.log('Left Win')
        leftScore++
        elements.leftScoreEl.textContent = `Score: ${leftScore}`  
        enableUpdate = false      

        setTimeout(() => {
            enableUpdate = true
            setStyleProperty('--ball-left', `${ballPhisycs.x = 450}px`)
            setStyleProperty('--ball-top', `${ballPhisycs.y = 40}px`)
        }, 1000)
    

    }else if(collision(elements.leftWall.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        console.log('Right Win')
        rightScore++
        elements.rightScoreEl.textContent = `Score: ${rightScore}`
        enableUpdate = false
    
        setTimeout(() => {
            enableUpdate = true
            setStyleProperty('--ball-left', `${ballPhisycs.x = 450}px`)
            setStyleProperty('--ball-top', `${ballPhisycs.y = 40}px`)
        }, 1000)

    }else if(collision(elements.topWall.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        ballPhisycs.vx *= 1
        ballPhisycs.vy *= -1 

    }else if(collision(elements.bottomWall.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        ballPhisycs.vx *= 1
        ballPhisycs.vy *= -1 
    }

    setStyleProperty('--ball-left', `${ballPhisycs.x -= ballPhisycs.vx}px`)
    setStyleProperty('--ball-top', `${ballPhisycs.y += ballPhisycs.vy}px`)
}

// second desk
function ballCatchSecondDesk(){
    if(collision(elements.secondDesk.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        let random = randomNum(2)
        if(random == 1){
            ballPhisycs.vx *= -1
            ballPhisycs.vy *= 1            
        }else{
            ballPhisycs.vx *= -1
            ballPhisycs.vy *= -1
        }
    }else if(collision(elements.rightWall.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        elements.leftScoreEl.textContent = `Score: ${leftScore}`  
        enableUpdate = false      

        setTimeout(() => {
            enableUpdate = true
            setStyleProperty('--ball-left', `${ballPhisycs.x = 450}px`)
            setStyleProperty('--ball-top', `${ballPhisycs.y = 40}px`)
        }, 1000)
    

    }else if(collision(elements.leftWall.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        elements.rightScoreEl.textContent = `Score: ${rightScore}`
        enableUpdate = false
    
        setTimeout(() => {
            enableUpdate = true
            setStyleProperty('--ball-left', `${ballPhisycs.x = 450}px`)
            setStyleProperty('--ball-top', `${ballPhisycs.y = 40}px`)
        }, 1000)

    }else if(collision(elements.topWall.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        ballPhisycs.vx *= 1
        ballPhisycs.vy *= -1 

    }else if(collision(elements.bottomWall.getBoundingClientRect(), elements.ball.getBoundingClientRect())){
        ballPhisycs.vx *= 1
        ballPhisycs.vy *= -1 
    }

    setStyleProperty('--ball-left', `${ballPhisycs.x -= ballPhisycs.vx}px`)
    setStyleProperty('--ball-top', `${ballPhisycs.y += ballPhisycs.vy}px`)
}



// firs desk moves
const stepSize = 4

let topPositionDesk1 = 65
let leftPositionDesk1 = 50


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            topPositionDesk1 -= stepSize;
            break;
        case 's':
            topPositionDesk1 += stepSize;
            break;
    }

    elements.firsDesk.style.top = topPositionDesk1 + '%';
    elements.firsDesk.style.left = leftPositionDesk1 + 'px';
});

//second desk moves
let topPositionDesk2 = 20
let rightPositionDesk2 = 50


document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            topPositionDesk2 -= stepSize;
            break;
        case 'ArrowDown':
            topPositionDesk2 += stepSize;
            break;
    }

    elements.secondDesk.style.top = topPositionDesk2 + '%';
    elements.secondDesk.style.right = rightPositionDesk2 + 'px';
});

// collision
function collision(rect1, rect2){
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {

        return true
    }else{

        return false
    }
}

// ball direction on random
function randomNum(max){
    return Math.floor(Math.random() * max)
}


//Game Over
function checkGameOver(){
    if(leftScore === 10 || rightScore === 10){
        elements.overEl.textContent = 'Game Over'
        elements.overEl.style.display = 'block' 
        elements.startAgainBtn.style.display = 'block'
        enableUpdate = false
    } 
}



})