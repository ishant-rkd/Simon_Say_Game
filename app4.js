let highestLevel = localStorage.getItem("highestLevel") || 0;
document.getElementById("highLevel").innerText = `Highest Level: ${highestLevel}`;
let gameseq=[];
let userseq=[];

let btns=["red","green","yellow","perpul"]
let started= false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started== false){
        console.log("gane is started");
        started=true;

        levelup();
    }
});
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500)
    
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },500)
    
}

function levelup(){
    userseq=[];
    level++;
    h2.innerText=`level${level}`;
    let rendinx= Math.floor(Math.random()*4);
    let randcolor=btns[rendinx];
    let randbtn=document.querySelector(`.${randcolor}`);
    /*console.log(randcolor);
    console.log(rendinx);
     console.log(randbtn);*/
     gameseq.push(randcolor);
     console.log(gameseq);
    gameFlash(randbtn);
}
function checkans(idx){
    //console.log("current level:",level)
    
    if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }
    }
    else{
      h2.innerHTML=` game is over your level is <b>${level}<b/> <br/> prass any key to start!`;
      document.querySelector("body").style.backgroundColor="red";
      setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
      },150);
      reset();  
    }
}
function btnpress(){
    //console.log(this);
    let btn =this;
    userFlash(btn)

    userColor= btn.getAttribute("id");
    userseq.push(userColor);
    checkans(userseq.length-1)
}

let allbtn=document.querySelectorAll(".btn");
for(btn of allbtn){
    btn.addEventListener("click",btnpress);
}

function reset(){
    if(level > highestLevel){
        highestLevel = level;
        localStorage.setItem("highestLevel", highestLevel);
        document.getElementById("highLevel").innerText = `Highest Level: ${highestLevel}`;
    }
    started=false;
    gameseq=[];
    userseq=[];
    level=0;
}
