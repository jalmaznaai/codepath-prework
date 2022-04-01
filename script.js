// global constants
// const clueHoldTime = 500; //how long to hold each clue's light/sound
// const cluePauseTime = 333; //how long to pause in between clues
// const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
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
const decreaseRate = 1.148698307;
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
var skipCounter = 0;
console.log("skip counter is at " + skipCounter);
var hasClickedGameButtons = false;
var clueHoldTime = 500; //how long to hold each clue's light/sound
var cluePauseTime = 333; //how long to pause in between clues
var nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence
var decreaseCount = 5;

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
  stop = false;
  gamePlaying = true;
  progress = 0;
  lives = 3;
  skipCounter++;
  console.log("skip counter is now at " + skipCounter);
  // swap the Start and Stop buttons
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  document.getElementById("xMark1").classList.remove("hidden");
  document.getElementById("xMark2").classList.remove("hidden");
  document.getElementById("xMark3").classList.remove("hidden");
  playClueSequence();
}

function stopGame() {
  if(!hasClickedGameButtons)
    skipCounter++;
  //initialize game variables
  gamePlaying = false;
  hasClickedGameButtons = false;
  // swap the Start and Stop buttons
  if(skipCounter < 8)
    {
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
  stop = true;
    }
  else if(skipCounter >= 8)
    {
      skipGame();
    }
}

function startGamePlus()
{
  gamePlaying = true;
  gamePlayingPlus = true;
  for(let i = 0; i < pattern.length; i++)
    {
      console.log(pattern[i]);
    }
  // pattern = {};
  pattern = [...patternCopy];
  progress = 7;
  for(let i = 0; i < pattern.length; i++)
    {
      console.log(pattern[i]);
    }
  lives = 3;
  stop = false;
  document.getElementById("startPlusBtn").classList.add("hidden");
  document.getElementById("stopPlusBtn").classList.remove("hidden");
  document.getElementById("xMark1").classList.remove("hidden");
  document.getElementById("xMark2").classList.remove("hidden");
  document.getElementById("xMark3").classList.remove("hidden");
  playClueSequencePlus();
}

function stopGamePlus()
{
  gamePlaying = false;
  gamePlayingPlus = false;
  document.getElementById("startPlusBtn").classList.remove("hidden");
  document.getElementById("stopPlusBtn").classList.add("hidden");
  speedReset();
  stopBuggyStartPlus();
  stop = true;
}

function skipGame()
{
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startPlusBtn").classList.remove("hidden");
  document.getElementById("skipInfo").classList.remove("hidden");
  document.getElementById("body").classList.add("newGameMode");
  playPassSound();
  stopGamePlus();
  stopBuggyStartPlus();
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

async function playClueSequence(){
  context.resume()
  guessCounter = 0;
  disableButtons();
  setTimeout(disableButtons(), nextClueWaitTime * pattern.length);
  let delay = nextClueWaitTime; //set delay to initial wait time
  await sleep(nextClueWaitTime);
  for(let i=0;i<=progress && !stop;i++){ // for each clue that is revealed so far
    if(stop)
      break;
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    // setTimeout(playSingleClue,delay * 2,pattern[i]) // set a timeout to play that clue
    playSingleClue(pattern[i]);
    await sleep(cluePauseTime + clueHoldTime + 1.01);
    //delay += clueHoldTime;
    //delay += cluePauseTime;
  }
  enableButtons();
}

async function playClueSequencePlus(){
  context.resume()
  guessCounter = 0;
  disableButtons();
  setTimeout(disableButtons(), nextClueWaitTime * pattern.length);
  let delay = nextClueWaitTime; //set delay to initial wait time
  await sleep(nextClueWaitTime);
  for(let i=0;i<=progress && !stop;i++){ // for each clue that is revealed so far
    if(stop)
      break;
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    // setTimeout(playSingleClue,delay * 2,pattern[i]) // set a timeout to play that clue
    playSingleClue(pattern[i]);
    await sleep(cluePauseTime + clueHoldTime);
    //delay += clueHoldTime;
    //delay += cluePauseTime;
  }
  enableButtons();
}

function lose(){
  playFailSound()
  loseLife();
  lives -= 1;
  stop = false;
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
  console.log("sequence should replay after this 0");
  stop = false;
  if(lives == 0)
    {  
  stopGamePlus();
  alert("Game Over. Your high score this run was " + score + "");
    }
}

function winGame(){
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("body").classList.add("newGameMode");
  stopGamePlus();
  alert("You won! Press Start++ for an endless mode!");
  document.getElementById("newInfo").classList.remove("hidden");
}

function guess(btn){
  if(!gamePlaying || !document.getElementById("button" + btn).classList.contains("clickable")){
    return;
  }
  skipCounter = 0;
  hasClickedGameButtons = true;
  console.log("user guessed: " + btn);
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
                  console.log("first path goes");
                  progress++;
                  addToPattern();
                  speedUp();
                  playClueSequencePlus();
                }
            }
          else
            {
              if(!gamePlayingPlus)
                {
              progress++;
              playClueSequence();
                }
              else
                {
                  console.log("second path goes");
                  progress++;
                  addToPattern();
                  playClueSequencePlus();
                }
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
        {
        lose();
        playClueSequence();
        }
      else
        losePlus();
        console.log("sequence should replay after this.");
        speedDown();
        playClueSequencePlus();
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
  if(!(document.getElementById("button1").classList.contains("clickable")))
    return;
  console.log("Sequence stopped by user");
  stop = true;
}

function disableButtons()
{
  document.getElementById("button1").classList.remove("clickable");
  document.getElementById("button2").classList.remove("clickable");
  document.getElementById("button3").classList.remove("clickable");
  document.getElementById("button4").classList.remove("clickable");
  document.getElementById("button5").classList.remove("clickable");
  document.getElementById("button6").classList.remove("clickable");
  document.getElementById("button7").classList.remove("clickable");
  document.getElementById("button8").classList.remove("clickable");
  document.getElementById("button1").disabled = true;
  document.getElementById("button2").disabled = true;
  document.getElementById("button3").disabled = true;
  document.getElementById("button4").disabled = true;
  document.getElementById("button5").disabled = true;
  document.getElementById("button6").disabled = true;
  document.getElementById("button7").disabled = true;
  document.getElementById("button8").disabled = true;
}

function enableButtons()
{
  document.getElementById("button1").classList.add("clickable");
  document.getElementById("button2").classList.add("clickable");
  document.getElementById("button3").classList.add("clickable");
  document.getElementById("button4").classList.add("clickable");
  document.getElementById("button5").classList.add("clickable");
  document.getElementById("button6").classList.add("clickable");
  document.getElementById("button7").classList.add("clickable");
  document.getElementById("button8").classList.add("clickable");
  document.getElementById("button1").disabled = false;
  document.getElementById("button2").disabled = false;
  document.getElementById("button3").disabled = false;
  document.getElementById("button4").disabled = false;
  document.getElementById("button5").disabled = false;
  document.getElementById("button6").disabled = false;
  document.getElementById("button7").disabled = false;
  document.getElementById("button8").disabled = false;
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
  console.log(pattern.length);
  pattern.push(parseInt((Math.random() * 8) + 1));
  console.log(pattern.length);
  console.log("added button" + pattern[pattern.length - 1] + " to pattern");
  
}

function updateScores()
{
  score = guessCounter + 1;
      if(score > highScore)
        highScore = score;
  document.getElementById("score").innerHTML = "Score: " + score;
  document.getElementById("highScore").innerHTML = "High Score: " + highScore;
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

function speedUp()
{
  if(decreaseCount > 0)
    {
      console.log(clueHoldTime);
      console.log(cluePauseTime);
      console.log(nextClueWaitTime);
  clueHoldTime /= decreaseRate;
  cluePauseTime /= decreaseRate;
  nextClueWaitTime /= decreaseRate;
      console.log(clueHoldTime);
      console.log(cluePauseTime);
      console.log(nextClueWaitTime);
      decreaseCount--
      
    }
}

function speedDown()
{
  if(decreaseCount < 5)
    {
  clueHoldTime *= decreaseRate;
  cluePauseTime *= decreaseRate;
  nextClueWaitTime *= decreaseRate;
      decreaseCount++;
    }
}

function speedReset()
{
  clueHoldTime = 500;
  cluePauseTime = 333;
  nextClueWaitTime = 1000;
  decreaseCount = 5;
}

function pauseStartPlus()
{
  document.getElementById("startPlusBtn").disabled = true;
}

function resumeStartPlus()
{
  document.getElementById("startPlusBtn").disabled = false;
}

function stopBuggyStartPlus()
{
  pauseStartPlus();
  setTimeout(resumeStartPlus, 1500);
}