let gameSeq=[];
let userSeq=[];

let started=false;
let level=0;

let btns=["yellow","red","purple","green"];

let h3=document.querySelector("h3")

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started=true;
        levelup();
    }
   
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

function levelup(){
    userSeq=[];
    level++;
    h3.innerText=`Level ${level}`;
    //for random index
    let randomidx = Math.floor(Math.random()*3);
    let randomColor = btns[randomidx];
    let randombtn=document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    gameflash(randombtn);
}

function checkAns(idx){
    // console.log("curr level : ",level);
    // let idx=level-1;

    if(userSeq[idx]=== gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelup,1000);
        }
    }else{
        h3.innerHTML=`game over ! your score was <b>${level} </br>press any key to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },250);
        reset();
    }
}
function btnPress(){
    
    let btn=this;
    userflash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

//reset function

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}