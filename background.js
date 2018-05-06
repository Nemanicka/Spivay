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
      for (let x=0; x<request.message.melodies.length; ++x) {
        let synth = new Tone.PolySynth(request.message.melodies.length, Tone.Synth).toMaster();
        let melody = request.message.melodies[x];
        if (melody.length < 3) {
          return;
        }

        // function triggerSynth(note, dur, time){
        //   console.log(note, dur, time);
        //   if (note.length === 1) {
        //     // synth.triggerAttackRelease(null,  dur, time);
        //   } else {
        //     synth.triggerAttackRelease(note, dur, time);
        //   }
        // }

        // let instrument = melody[1];
        //
        let delay = 0;

        // console.log(melody);

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
            velocity: 0.7
          }

          normilizedMelody.push(obj);
          delay += Tone.Time(melody[i][0] + "n").toSeconds();
        }

        var part1 = new Tone.Part(function(time, value) {
          synth.triggerAttackRelease(value.note, value.duration, time, value.velocity);
          // console.log(value);
          // if (!checkNote(value)) {
          //   return;
          // }
          // let note = value.slice(1);
          // synth.triggerAttackRelease(note, value[0] + "n", time);
          // delay += Tone.Time(value[0] + "n").toSeconds();
        }, normilizedMelody ).start(0);

        // for (let i = 2; i<melody.length; ++i) {
        //   if (!checkNote(melody[i])) {
        //     continue;
        //   }
        //   let note = melody[i].slice(1);
        //   Tone.Transport.schedule(triggerSynth(note, melody[i][0] + "n", delay));
        //   delay += Tone.Time(melody[i][0] + "n").toSeconds();
        // }
      }

      // Tone.Transport.start("+0.1");


      // let HeyHoNotes = ["D4","C4","D4","D4","D4","A3",  "D4","D4","E4","E4","F4","F4","F4","F4","E4",   "A4","G4","A4","G4","A4","G4","A4","G4","F4","E4"];
      // let HeyHoDurations = ["2n","2n","4n","8n","8n","2n", "4n","4n","4n","4n","8n","8n","8n","8n","2n","4n+8n","8n","4n+8n","8n","4n+8n","8n","8n","8n","8n","8n"];
      // let HeHoVelocity = [0.9,0.9,0.9,0.7,0.7,0.9,  0.9,0.7,0.9,0.7,0.9,0.7,0.7,0.7,0.9,   0.9,0.7,0.9,0.7,0.9,0.7,0.9,0.7,0.7,0.7];
      //
      // var HeyHoMelody = Rhythm.mergeDurationVelocityAndPitch(HeyHoDurations, HeyHoNotes, HeHoVelocity);
      // console.log(HeyHoMelody);
      // let synth1 = new Tone.PolySynth(request.message.melodies.length, Tone.Synth).toMaster();
      //
      // var heyHoPart1 = new Tone.Part(function(time, value){
      //     // synth1.triggerAttackRelease(value.note, value.duration, time, value.velocity)
      // }, HeyHoMelody ).start(0);
      // instruments.electricCello.volume.value = -5;

      // let synth2 = new Tone.PolySynth(request.message.melodies.length, Tone.Synth).toMaster();
      // var heyHoPart2 = new Tone.Part(function(time, value){
      //     synth2.triggerAttackRelease(value.note, value.duration, time, value.velocity)
      // }, HeyHoMelody ).start(0);

      // offset 4 bars
      // var heyHoPart3 = new Tone.Part(function(time, value){
      //     instruments.steelPan.triggerAttackRelease(value.note, value.duration, time, value.velocity)
      // }, HeyHoMelody ).start("4*1m");
      // instruments.steelPan.volume.value = -10;

      //TRANSPORT
      // heyHoPart1.loopStart = "0";
      // heyHoPart1.loopEnd = "6:0";
      // heyHoPart1.loop = 3;
      //
      // // still play 6 bars (but start 2 bars late)
      // heyHoPart2.loopStart = "0";
      // heyHoPart2.loopEnd = "6:0";
      // heyHoPart2.loop = 3;
      //
      // // still play 6 bars (but start 4 bars late)
      // heyHoPart3.loopStart = "0";
      // heyHoPart3.loopEnd = "6:0";
      // heyHoPart3.loop = 3;

      // Tone.Transport.bpm.value = 170;
      Tone.Transport.start("+0.1");
    }

    if (request.message.code === "listeners"){
      chrome.tabs.executeScript(null, {file: "injected_script.js"});
      sendResponse({message: "OK"});
    }
  }
);
