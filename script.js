let startTime=0;//Timestamp when the stopwatch starts.
let updatedTime;//: Current time - startTime, updated continuously.
let difference=0;// Keeps track of paused time, so resume works correctly.
let timerInterval;//Holds the setInterval ID.
let isRunning=false; //Boolean flag to track if stopwatch is active.
let lapCounter=1; //Tracks lap numbers.

const display=document.querySelector(".display");

const startbtn=document.getElementById("start");
const pauseBtn=document.getElementById("pause");
const resetBtn=document.getElementById("reset");
const lapBtn=document.getElementById("lap");
const lapList=document.getElementById("laplist");
//START BUTTON LOGIC
startbtn.addEventListener("click",()=>{
    if(!isRunning ){
        isRunning=true;
        startTime=new Date().getTime()-difference;
        timerInterval=setInterval(updateTime,10)
    }
})
//PAUSE BUTTON LOGIC =>Stops the interval timer.
//Stores time passed in difference so resume keeps it.
pauseBtn.addEventListener("click",()=>{
    if (isRunning) {
        isRunning=false;
        clearInterval(timerInterval);
        difference=new Date().getTime()-startTime
    }
})
//RESET BUTTON LOGIC
resetBtn.addEventListener("click",()=>{
    isRunning=false;
    clearInterval(timerInterval);
    display.textContent="00:00:00.00";
   difference=0;
   lapList.innerHTML="";
   lapCounter=1;
})
//LAP BUTTON LOGIC
lapBtn.addEventListener("click",()=>{
    if (isRunning) {
        const currentTime=formatTime(new Date().getTime()-startTime);
        const lapItem=document.createElement("li");
        lapItem.textContent=`lap ${lapCounter++}: ${currentTime}`
       //lapList.prepend(lapItem)// print the lap counting backwards
       lapList.append(lapItem)

    }
})
//UPDATING DISPLAY
function updateTime() {
  updatedTime= new Date().getTime()-startTime;
  display.textContent=formatTime(updatedTime)
}
//FORMATTING TIME
function formatTime(ms){
    let milliseconds =parseInt((ms%1000)/10);
    let seconds =parseInt((ms/1000)%60);
    let minutes =parseInt((ms/(1000*60)%60));
    let hours =parseInt((ms/(1000*60*60)%24));
    return(
        (hours<10?"0"+hours:hours)+":"+
        (minutes<10?"0"+minutes:minutes)+":"+
        (seconds<10?"0" + seconds:seconds)+"."+
         (milliseconds<10?"0" + milliseconds:milliseconds))   
    

}