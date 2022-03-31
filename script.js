// global constants
const clueHoldTime = 500; //how long to hold each clue's light/sound
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
const patternCopy = [2, 2, 4, 3, 2, 1, 2, 4];
// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 293.7,
  3: 329.63,
  4: 349.23,
  5: 392.00,
  6: 440.00,
  7: 493.88,
  8: 523.25
}
//Global variables
var pattern = [2, 2, 4, 3, 2, 1, 2, 4];
var progress = 0;
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
document.getElementById("sectionPass").volume = 0.3;
document.getElementById("sectionFail").volume = 0.3;
var sound = document.getElementById("sectionPass");
var stop = false;
var lives = 3;
var score = 0;
var highScore = 0;
var gamePlayingPlus = false;


// Page Initialization
// Init Sound Synthesizer
var AudioContext = window.AudioContext || window.webkitAudioContext 
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)


function startGame() {
  //initialize game variables
  
  gamePlaying = true;
  progress = 0;
  lives = 3;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("xMark1").classList.remove("hidden");
  document.getElementById("xMark2").classList.remove("hidden");
  document.getElementById("xMark3").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  //initialize game variables
  gamePlaying = false;
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  stop = false;
}

function startGamePlus()
{
  gamePlaying = true;
  gamePlayingPlus = true;
  pattern = patternCopy;
  progress = 7;
  document.getElementById("startPlusBtn").classList.add("hidden");
  document.getElementById("stopPlusBtn").classList.remove("hidden");
  playClueSequencePlus();
}

function stopGamePlus()
{
  gamePlaying = false;
  gamePlayingPlus = false;
  document.getElementById("startPlusBtn").classList.remove("hidden");
  document.getElementById("stopPlusBtn").classList.add("hidden");
  stop = false;
}

function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  context.resume()
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}

function startTone(btn){
  if(!tonePlaying){
    context.resume()
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    context.resume()
    tonePlaying = true
  }
}
function stopTone(){
  g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
  tonePlaying = false
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    if(stop)
      return;
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
    
  }
}

function playClueSequence(){
  context.resume()
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress && !stop;i++){ // for each clue that is revealed so far
    if(stop)
      return;
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
}

function playClueSequencePlus(){
  context.resume()
  guessCounter = 0;
  disableButtons();
  //addToPattern();
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime
    delay += cluePauseTime;
  }
  enableButtons();
}

function lose(){
  playFailSound()
  loseLife();
  lives -= 1;
  if(lives == 0)
    {  
  stopGame();
  alert("Game Over. You lost.");
    }
}

function losePlus(){
  playFailSound()
  loseLife();
  lives -= 1;
  if(lives == 0)
    {  
  stopGamePlus();
  alert("Game Over. Your high score this run was " + score + "");
    }
}

function winGame(){
  document.getElementById("stopBtn").classList.add("hidden");
  stopGamePlus();
  alert("You won! Press Start++ for an endless mode!");
}

function guess(btn){
  console.log("user guessed: " + btn);
  if(!gamePlaying){
    return;
  }
  if(btn == pattern[guessCounter])
    {
      if(guessCounter == progress)
        {
          playPassSound();
          stop = false;
          gainLife();
          updateScores();
          if(progress == pattern.length - 1)
            {
              if(!gamePlayingPlus)
              winGame();
              else
                {
                  progress++;
                  playClueSequencePlus();
                }
            }
          else
            {
              progress++;
              playClueSequence();
            }
        }
      else
      {
        guessCounter++;
      }
    }
  else
    {
      if(!gamePlayingPlus)
        lose();
      else
        losePlus();
    }
}


function playPassSound()
{
  sound.pause();
  sound.currentTime = 0;
  sound = document.getElementById("sectionPass");
  sound.play();
  
}
function playFailSound()
{
  sound.pause();
  sound.currentTime = 0;
  sound = document.getElementById("sectionFail");
  sound.play();
}

function stopSequence()
{
  console.log("Sequence stopped by user");
  stop = true;
}

function disableButtons()
{
  document.getElementByID("button1").classList.remove("clickable");
  document.getElementByID("button2").classList.remove("clickable");
  document.getElementByID("button3").classList.remove("clickable");
  document.getElementByID("button4").classList.remove("clickable");
  document.getElementByID("button5").classList.remove("clickable");
  document.getElementByID("button6").classList.remove("clickable");
  document.getElementByID("button7").classList.remove("clickable");
  document.getElementByID("button8").classList.remove("clickable");
}

function enableButtons()
{
  document.getElementByID("button1").classList.add("clickable");
  document.getElementByID("button2").classList.add("clickable");
  document.getElementByID("button3").classList.add("clickable");
  document.getElementByID("button4").classList.add("clickable");
  document.getElementByID("button5").classList.add("clickable");
  document.getElementByID("button6").classList.add("clickable");
  document.getElementByID("button7").classList.add("clickable");
  document.getElementByID("button8").classList.add("clickable");
}


function loseLife()
{
  document.getElementById("xMark" + lives).classList.add("hidden");
}

function gainLife()
{
  if(lives == 3)
    { 
    console.log("Already at max lives!");
    return;
    }
  lives += 1;
  document.getElementById("xMark" + lives).classList.remove("hidden");
}

function addToPattern()
{
  pattern.push(parseInt((Math.random() * 8) + 1));
}

function updateScores()
{
  score = guessCounter + 1;
      if(score > highScore)
        highScore = score;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("highScore").innerHTML = "High Score: " + highScore;
}

    loseGame();
  // add game logic here
}
