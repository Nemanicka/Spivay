// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';






		// GUI //
    //
		// var keyboard = Interface.Keyboard();
    //
		// keyboard.keyDown = function (note) {
		//     synth.triggerAttack(note);
		// };
    //
		// keyboard.keyUp = function () {
		//     synth.triggerRelease();
		// };
    //
		// var sel = document.getElementById('toload');
		// function onchangename(){
		// 	var tag=sel.value;
		// 	var url='https://surikov.github.io/webaudiofontdata/sound/'+tag+'.js';
		// 	var variable='_tone_'+tag;
		// 	synth.loadInstrument(url,variable);
		// }



// #spivay piano 4E4 4B4 4B4 4G4 4F#4 4F#4 4F#4 8F#4 8G4 4E4
// #spivay piano 4E4 4B4 4B4 4G4 4G4 4E2

/// GOT
///#spivay piano 2E4 2A3 8C4 8D4 2E4 2A3 8C4 8D4 4B3 4E3 8G3 8A3 4B3 4E3 8G3 8A3 4B3 4E3 8G3 8A3 4B3 4E3 4E3 2D4 2G3 8C4 8B3 2D4 2G3 8C4 8B3 4A3 4E3 8F3 8G3 4A3 4E3 8F3 8G3 4A3 4E3 8F3 8G3 2A3

// #spivay piano 2E4 2A3 8C4 8D4 2E4 2A3 8C4 8D4 4B3 4E3 8G3 8A3 4B3 4E3 8G3 8A3 4B3 4E3 8G3 8A3 4B3 4E3 8G3 4A3 4D3

// var toneContext = new AudioContext();

///#spivay piano 2E4 2A3 8C4 8D4 2E4 2A3 8C4 8D4 4B3 4E3 8G3 8A3 4B3 4E3 8G3 8A3 4B3 4E3 8G3 8A3 4B3 4E3 4E3 2D4 2G3 8C4 8B3 2D4 2G3 8C4 8B3 4A3 4E3 8F3 8G3 4A3 4E3 8F3 8G3 4A3 4E3 8F3 8G3 2A3

///#spivay piano 1A2 4A2 1A2 4A2 1E2 1E2 1E2 1G2 4G2 1G2 4G2 2A2 4A2 2A2 4A2 2A2 4A2 2A2 2A2

var allowedNotes = {
  "A" : 1,
  "A#" : 1,
  "AB" : 1,
  "B" : 1,
  "B#" : 1,
  "BB" : 1,
  "C" : 1,
  "C#" : 1,
  "CB" : 1,
  "D" : 1,
  "D#" : 1,
  "DB" : 1,
  "E" : 1,
  "E#" : 1,
  "EB" : 1,
  "F" : 1,
  "F#" : 1,
  "FB" : 1,
  "G" : 1,
  "G#" : 1,
  "GB" : 1
}


var checkNote = function (input) {
  /// The first char should be digit denoting the length of the note
  let length = parseInt(input[0]);
  if (length === NaN || length>128) {
    console.log("error 0");
    return false;
  }

  let note = null;
  let octave = null;

  /// Note of length 2 should be only a pause
  if (input.length === 2) {
    if (input[1].toUpperCase() != "P") {
      console.log("error 1");
      return false;
    } else {
      return true;
    }
  } else if (input.length === 3) {
    note = input[1].toUpperCase();
    octave = parseInt(input[2]);
  } else if (input.length === 4) {
    note = (input[1] + input[2]).toUpperCase();
    octave = parseInt(input[3]);
  } else {
    console.log("error 2");
    return false;
  }

  if (!allowedNotes[note]) {
    console.log("error 3",note);
    return false;
  }

  if (octave > 9 || octave < 0) {
    console.log("error 4");
    return false;
  }

  return true;
};
'./audio/salamander/'
var piano = null;

var defineVariables = function () {

  piano = new Tone.Sampler({
  			'A0' : 'A0.[ogg]',
  			'C1' : 'C1.[ogg]',
  			'D#1' : 'Ds1.[ogg]',
  			'F#1' : 'Fs1.[mp3|ogg]',
  			'A1' : 'A1.[mp3|ogg]',
  			'C2' : 'C2.[mp3|ogg]',
  			'D#2' : 'Ds2.[mp3|ogg]',
  			'F#2' : 'Fs2.[mp3|ogg]',
  			'A2' : 'A2.[mp3|ogg]',
  			'C3' : 'C3.[mp3|ogg]',
  			'D#3' : 'Ds3.[mp3|ogg]',
  			'F#3' : 'Fs3.[mp3|ogg]',
  			'A3' : 'A3.[mp3|ogg]',
  			'C4' : 'C4.[mp3|ogg]',
  			'D#4' : 'Ds4.[mp3|ogg]',
  			'F#4' : 'Fs4.[mp3|ogg]',
  			'A4' : 'A4.[mp3|ogg]',
  			'C5' : 'C5.[mp3|ogg]',
  			'D#5' : 'Ds5.[mp3|ogg]',
  			'F#5' : 'Fs5.[mp3|ogg]',
  			'A5' : 'A5.[mp3|ogg]',
  			'C6' : 'C6.[mp3|ogg]',
  			'D#6' : 'Ds6.[mp3|ogg]',
  			'F#6' : 'Fs6.[mp3|ogg]',
  			'A6' : 'A6.[mp3|ogg]',
  			'C7' : 'C7.[mp3|ogg]',
  			'D#7' : 'Ds7.[mp3|ogg]',
  			'F#7' : 'Fs7.[mp3|ogg]',
  			'A7' : 'A7.[mp3|ogg]',
  			'C8' : 'C8.[mp3|ogg]'
  		}, //function () {},
      {
  			'release' : 1,
        'baseUrl' : './audio/salamander/',
        'onload': function () {console.log("LOADED"); Tone.Transport.start();} 
  			// 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
  		}).toMaster();
};


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (!request.message.code) {
      return;
    }

    if (request.message.code === "play"){


      var ctx = new AudioContext();
      Tone.setContext(ctx);

      defineVariables();



      // var instr = new Tone.WebAudioFontInstrument({
      //   "oscillator" : {
      //     "type" : "square"
      //   },
      //   "envelope" : {
      //     "attack" : 0.01,
      //     "decay" : 0.2,
      //     "sustain" : 0.2,
      //     "release" : 0.2,
      //   }
      // }).toMaster();
      //
      // let tag = '0180_GeneralUserGS_sf2_file';
      // let variable = '_tone_' + tag;
      // let url='https://surikov.github.io/webaudiofontdata/sound/' + tag + '.js';
      // instr.loadInstrument(url, variable);

      console.log("playing");

      let orderedMelodies = {};
      Object.keys(request.message.melodies).sort().forEach(function(key) {
        orderedMelodies[key] = request.message.melodies[key];
      });

      console.log(orderedMelodies);
      let duration = 0;
      let partDelay = 0;
      let incrementDelay = 0;
      for (let part in orderedMelodies) {
        let inst = new Tone.Synth();

        for (let x=0; x<orderedMelodies[part].length; ++x) {
          // let synth = new Tone.PolySynth(orderedMelodies[part].length, Tone.Synth).toMaster();

          let synth = piano;
          // synth.triggerAttackRelease("C4", "8n");

          let melody = orderedMelodies[part][x];
          console.log("Melody = ", melody);

          if (melody.length < 3) {
            console.log("Less then 3 melody tokens");
            return;
          }
          let delay = 0;

          let normilizedMelody = [];
          for (let i = 2; i<melody.length; ++i) {
            if (!checkNote(melody[i])) {
              continue;
            }
            let note = melody[i].slice(1);

            let obj = {
              time: delay,
              note: note,
              duration: melody[i][0] + "n",
              velocity: 1
            }

            normilizedMelody.push(obj);
            delay += Tone.Time(melody[i][0] + "n").toSeconds();
          }

          var part1 = new Tone.Part(function(time, value) {
            synth.triggerAttackRelease(value.note, value.duration, time, value.velocity);
          }, normilizedMelody ).start(partDelay);

          if (x === 0) {
            incrementDelay = delay;
          }
          console.log("adding", incrementDelay);
        }
        partDelay += incrementDelay;
      }
      // Tone.Transport.bpm.rampTo(240, 0);
      // console.log("started xxx", typeof(duration), typeof(duration*500));
      sendResponse({duration: partDelay*1000});
      // sendResponse({message: "Started2"});

      // Tone.Transport.start();
    }

    if (request.message.code === "stop"){
      console.log("stop...");
      Tone.Transport.stop();
      sendResponse({message: "Stopped"});
    }

    if (request.message.code === "listeners"){
      console.log("exec...");

      // chrome.tabs.executeScript(null, { file: "widgets.js" }, function() {
        // console.log("going to exec...");
        chrome.tabs.executeScript(null, {file: "injected_script.js"});
      // });
    }
  }
);
