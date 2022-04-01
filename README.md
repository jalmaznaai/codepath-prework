# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Joseph Almaznaai**

Time spent: **18** hours spent in total

Link to project: https://glitch.com/edit/#!/indecisive-jumpy-ambert?path=style.css%3A5%3A25

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [x] More than 4 functional game buttons
* [x] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [x] Player only loses after 3 mistakes (instead of on the first mistake)
* [x] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [x] Simpler section for users to test out
- [x] Endless mode with procedurally generated sequences
- [x] Sequence replay speeding up upon success up to twice the defualt speed
- [x] Sequence replay slowing down upon a miss down to the default speed
- [x] Replay seuqence after miss

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:
![](http://g.recordit.co/QHMMGsdPyx.gif)
![](http://g.recordit.co/zKYToXzvN2.gif)
![](http://g.recordit.co/qJiXjGYEnY.gif)
![](http://g.recordit.co/GNL8AP9css.gif)
![](http://g.recordit.co/Oxsk3JT34M.gif)
![](http://g.recordit.co/zlJm7mzf9L.gif)

## Reflection Questions
**1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here.**

Aside from prior knowledge and the information directly on the prework's instructional page, I used several sources that help teach me aspects of html, javascript, and css that I didn't know before. I also used some code from a user who developed a sleep/wait function that would halt the program for some time, allowing it to be in sync with the notes played. [I'll list the sources I used here in a pastebin, as it contains 25 links in total along with uses and explanations behind them.](https://pastebin.com/2VVHd6SY)



**2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words)**

    At the start, I had the plan for an endless mode that could be accessed after the first predefined eight notes were hit. Since those notes would be the same every time, I wanted a shortcut for users to enter the endless mode relatively quickly. Since the first eight notes are the same every time the user loads the page, I wanted a way for the user to bypass the long wait of the notes playing back. So, I created a function that would halt the sequence replay by setting a boolean to true. The sequence would then check if the boolean was false in each iteration of its for loop before executing. The issue, however, was that the for loop would execute nearly instantly. I was under the assumption that the for loop waited until the audio was finished playing before continuing, but I realized late into my project that the for loop simply queues the oscillator to sound as needed. 
    So, I looked for any way to delay the for loop so it would be in sync with the sequence playback. I found a method online and used its code, but it didn't have the effect I anticipated. After a long period of experimenting, I tried removing the setTimeout method from the for loop. That instantly fixed my issue, and now the program was running in sync with the notes.
    Now, I wanted a way to disable the user from interrupting the sequence before it was done during the endless mode. I thought of creating a "clickable" class within HTML/CSS that would be checked whenever the user hit the button. It worked as I thought, but the user could still click and sound notes, which could distract the user from the notes being replayed. So, I found a way to disable the buttons.
    However, should the user use the current method of skipping to the endless mode (pressing the start/stop buttons 8 times), they'll find that multiple sequences are playing at once. To fix this, I limited the user from starting the endless mode immediately by disabling the start++ button.

**3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words)**

How do asynchronous code and the promise system work in Javascript?
    This is one that confused me the most. I don't have a complete understanding of what is going on here. The setTimeout function and the sleep function I found were not intuitive to anything I've learned before. I seem to have understood the idea of the playNote functions simply sending orders to the oscillator object, but the setTimeout function seems to behave in two different manners in my code. Not to mention the sleep function and the syntax within that function; I tried to look up the documentation of resolving and promises, but that didn't help much. After my submission, I'll look into these, but for now, I remain unsure.

How does someone format their website to work on all devices?
    I tried to avoid using any HTML/CSS code that would hard-code my elements to be exactly x pixels from the left and y pixels from the top, as I didn't want some elements to be hidden on smaller screens. I eventually had to do so for my gameScoreArea section, where I wanted to format it in the top-right of my screen but didn't know how to do so without absolute positions being used.

**4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words)**




## Interview Recording URL Link

[My 5-minute Interview Recording](https://www.loom.com/share/90acf216d20f49da9e8db8aabbbf1e51)


## License

    Copyright [YOUR NAME]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
