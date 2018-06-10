// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';



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



chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (!request.message.code) {
      return;
    }

    if (request.message.code === "play"){
      var ctx = new AudioContext();
      Tone.setContext(ctx);
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
        partDelay += incrementDelay;
        for (let x=0; x<orderedMelodies[part].length; ++x) {
          let synth = new Tone.PolySynth(orderedMelodies[part].length, Tone.Synth).toMaster();
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
            incrementDelay += delay;
          }

          duration += incrementDelay;
        }
      }
      // Tone.Transport.bpm.rampTo(240, 0);
      // console.log("started xxx", typeof(duration), typeof(duration*500));
      sendResponse({duration: duration*500});
      // sendResponse({message: "Started2"});

      Tone.Transport.start();
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
