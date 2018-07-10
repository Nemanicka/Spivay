// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


/// #spivay strings 8C4 8P 8D#4 8P 6C4 8C4 8P 8D#4 8P 6C4 8C4 8P 8D#4 8P 6C4 4D4 4C4 6A#3 8C4 8P 8D#4 8P 6C4 8C4 8P 8D#4 8P 6C4 8C4 8P 8D#4 8P 6C4 4D4 4C4 4A#3
/// #spivay piano 2C2 6P 2G#1 6P 2F1 6P 2A#1 6P 2C2 6P 2G#1 6P 2F1 6P 2A#1 6P



// #spivay piano 4E4 4B4 4B4 4G4 4F#4 4F#4 4F#4 8F#4 8G4 4E4
// #spivay piano 4E4 4B4 4B4 4G4 4G4 4E2

/// GOT
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

/// #spivay piano 3E4 3A3 16C4 16D4 4E4 4A3 8C4 8D4 4E4 4A3 8C4 8D4 2E4

var parseNote = function (input) {
  /// The first char should be digit denoting the length of the note
  let octave = null;
  let note = null;
  let duration = null;
  if (input[input.length - 1] === 'P') {
    let noteAndOctaveLength = 1;
    duration = parseInt(input.slice(0, -1));
    if (!duration) {
      console.log("error 1");
      return null;
    } else {
      return {
        note: 'P',
        duration: duration
      };
    }
  }

  octave = parseInt(input.slice(-1));
  if (!octave) {
    console.log("error 2");
    return null;
  }

  let noteAndOctaveLength = 2;
  if (input[input.length - 2] === '#') {
    note = input.slice(-3, -1);
    let noteAndOctaveLength = 3;
  } else {
    note = input.slice(-2, -1);
  }

  if (!allowedNotes[note]) {
    console.log("error 3");
    return null;
  }


  duration = parseInt(input.slice(0, input.length - noteAndOctaveLength));
  if (!duration) {
    console.log("error 4");
    return null;
  }

  return {
    note: note + octave,
    duration: duration
  };
};
// './audio/salamander/'

var instruments = {
  "piano": null,
  "cello": null,
  "strings": null,
  "dualstrings": null,
  "drums": null,
  "chorusfemale" : null,
  "chorusmale" : null
}

var loadBuffersPromises = [];

var defineVariables = function () {
  var drumsPromise = new Promise((resolve, reject) => {
  instruments["drums"] = new Tone.Sampler({
        'C0' : 'Tom1.wav',
        'C#0' : 'Tom2.wav',
        'D0' : 'Tom3.wav',
        'C1' : 'bass_drum1.wav',
        'C#1' : 'bass_drum2.wav',
        'D1' : 'bass_drum3.mp3',
        'D#1' : 'bass_drum4.mp3',
        'E1' : 'bass_drum5.mp3',
        'F1' : 'bass_drum6.mp3',
        'F#1' : 'bass_drum7.wav',
        'C2' : 'clash1.mp3',
        'C#2' : 'clash2.wav',
        'D2' : 'clash3.wav',
        'D#2' : 'clash4.wav',
        'E2' : 'clash5.wav',
        'C3' : 'shaker1.wav',
        'C#3' : 'shaker2.wav',
        'D3' : 'shaker3.wav',
        'D#3' : 'shaker4.wav',
        'E3' : 'shaker5.wav',
        'F4' : 'shaker6.wav',
        'F#3' : 'shaker7.wav',
        'C4' : 'snare1.wav',
        'C#4' : 'snare2.wav',
        'D4' : 'snare3.wav',
      }, //function () {},
      {
        'release' : 1,
        'baseUrl' : './audio/drums/',
        'onload': function () {console.log("loaded drums"); resolve("drums"); }
        // 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
      }).toMaster();
    });

  loadBuffersPromises.push(drumsPromise);

  var chorusfemalePromise = new Promise((resolve, reject) => {
  instruments["chorusfemale"] = new Tone.Sampler({
        'A4' : 'A4.[wav]',
        'A5' : 'A5.[wav]',
        'A#4' : 'As4.[wav]',
        'A#5' : 'As5.[wav]',
        'B4' : 'B4.[wav]',
        'B5' : 'B5.[wav]',
        'C5' : 'C5.[wav]',
        'C6' : 'C6.[wav]',
        'C#5' : 'Cs5.[wav]',
        'D5' : 'D5.[wav]',
        'D#5' : 'Ds5.[wav]',
        'E5' : 'E5.[wav]',
        'F5' : 'F5.[wav]',
        'F#5' : 'Fs5.[wav]',
        'G4' : 'G4.[wav]',
        'G5' : 'G5.[wav]',
        'G#4' : 'Gs4.[wav]',
        'G#5' : 'Gs5.[wav]'
      }, //function () {},
      {
        'release' : 1,
        'baseUrl' : './audio/chorusfemale/',
        'onload': function () {console.log("loaded chorusfemale"); resolve("chorusfemale"); }
        // 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
      }).toMaster();
    });

  loadBuffersPromises.push(chorusfemalePromise);

  var chorusmalePromise = new Promise((resolve, reject) => {
  instruments["chorusmale"] = new Tone.Sampler({
        // 'A1' : 'A1.[wav]',
        'A2' : 'A2.[wav]',
        'A3' : 'A3.[wav]',
        // 'A4' : 'A4.[wav]',
        // 'A5' : 'A5.[wav]',
  			'A#2' : 'As2.[wav]',
        'A#3' : 'As3.[wav]',
        // 'A#4' : 'As4.[mp3]',
        // 'A#5' : 'As5.[mp3]',
  			'B2' : 'B2.[wav]',
        'B3' : 'B3.[wav]',
        // // 'B4' : 'B4.[mp3]',
        // // 'B5' : 'B5.[mp3]'
        // 'C1' : 'C1.[wav]',
  			// 'C2' : 'C2.[wav]',
        'C3' : 'C3.[wav]',
        'C4' : 'C4.[wav]',
        // 'C5' : 'C5.[wav]',
        // 'C6' : 'C6.[wav]',
  			// 'C#2' : 'Cs2.[mp3]',
        'C#3' : 'Cs3.[wav]',
        'C#4' : 'Cs4.[wav]',
        // 'C#5' : 'Cs5.[mp3]',
  			// 'D2' : 'D2.[mp3]',
        'D3' : 'D3.[wav]',
        'D4' : 'D4.[wav]',
        // // 'D5' : 'D5.[mp3]'
        // 'D#1' : 'Ds1.[wav]',
  			// 'D#2' : 'Ds2.[wav]',
        'D#3' : 'Ds3.[wav]',
        'D#4' : 'Ds4.[wav]',
        // 'D#5' : 'Ds5.[wav]',
  			// 'E2' : 'E2.[mp3]',
        'E3' : 'E3.[wav]',
        'E4' : 'E4.[wav]',
        // 'E5' : 'E5.[mp3]',
  			// 'F2' : 'F2.[mp3]',
        'F3' : 'F3.[wav]',
        'F4' : 'F4.[wav]',
        // 'F5' : 'F5.[mp3]',
        // 'F#1' : 'Fs1.[wav]',
  			// 'F#2' : 'Fs2.[wav]',
        'F#3' : 'Fs3.[wav]',
        'F#4' : 'Fs4.[wav]',
        // 'F#5' : 'Fs5.[wav]',
  			'G2' : 'G2.[wav]',
        'G3' : 'G3.[wav]',
        // // 'G4' : 'G4.[mp3]',
        // // 'G5' : 'G5.[mp3]'
  			'G#2' : 'Gs2.[wav]',
        'G#3' : 'Gs3.[wav]',
        // 'G#4' : 'Gs4.[mp3]',
        // 'G#5' : 'Gs5.[mp3]'
  		}, //function () {},
      {
  			'release' : 1,
        'baseUrl' : './audio/chorusmale/',
        'onload': function () {console.log("loaded chorusmale"); resolve("chorusmale"); }
  			// 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
  		}).toMaster();
    });

  loadBuffersPromises.push(chorusmalePromise);


  var dualstringsPromise = new Promise((resolve, reject) => {
  instruments["dualstrings"] = new Tone.Sampler({
        'A1' : 'A1.[wav]',
        'A2' : 'A2.[wav]',
        'A3' : 'A3.[wav]',
        'A4' : 'A4.[wav]',
        'A5' : 'A5.[wav]',
  			// 'A#2' : 'As2.[mp3]',
        // 'A#3' : 'As3.[mp3]',
        // 'A#4' : 'As4.[mp3]',
        // 'A#5' : 'As5.[mp3]',
  			// // 'B2' : 'B2.[mp3]',
        // // 'B3' : 'B3.[mp3]',
        // // 'B4' : 'B4.[mp3]',
        // // 'B5' : 'B5.[mp3]'
        'C1' : 'C1.[wav]',
  			'C2' : 'C2.[wav]',
        'C3' : 'C3.[wav]',
        'C4' : 'C4.[wav]',
        'C5' : 'C5.[wav]',
        'C6' : 'C6.[wav]',
  			// 'C#2' : 'Cs2.[mp3]',
        // 'C#3' : 'Cs3.[mp3]',
        // 'C#4' : 'Cs4.[mp3]',
        // 'C#5' : 'Cs5.[mp3]',
  			// 'D2' : 'D2.[mp3]',
        // 'D3' : 'D3.[mp3]',
        // 'D4' : 'D4.[mp3]',
        // // 'D5' : 'D5.[mp3]'
        'D#1' : 'Ds1.[wav]',
  			'D#2' : 'Ds2.[wav]',
        'D#3' : 'Ds3.[wav]',
        'D#4' : 'Ds4.[wav]',
        'D#5' : 'Ds5.[wav]',
  			// 'E2' : 'E2.[mp3]',
        // 'E3' : 'E3.[mp3]',
        // 'E4' : 'E4.[mp3]',
        // 'E5' : 'E5.[mp3]',
  			// 'F2' : 'F2.[mp3]',
        // 'F3' : 'F3.[mp3]',
        // 'F4' : 'F4.[mp3]',
        // 'F5' : 'F5.[mp3]',
        'F#1' : 'Fs1.[wav]',
  			'F#2' : 'Fs2.[wav]',
        'F#3' : 'Fs3.[wav]',
        'F#4' : 'Fs4.[wav]',
        'F#5' : 'Fs5.[wav]',
  			// 'G2' : 'G2.[mp3]',
        // 'G3' : 'G3.[mp3]',
        // // 'G4' : 'G4.[mp3]',
        // // 'G5' : 'G5.[mp3]'
  			// 'G#2' : 'Gs2.[mp3]',
        // 'G#3' : 'Gs3.[mp3]',
        // 'G#4' : 'Gs4.[mp3]',
        // 'G#5' : 'Gs5.[mp3]'
  		}, //function () {},
      {
  			'release' : 1,
        'baseUrl' : './audio/dualstrings/',
        'onload': function () {console.log("loaded dualstrings"); resolve("chorusfemale"); }
  			// 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
  		}).toMaster();
    });

  loadBuffersPromises.push(dualstringsPromise);

  var stringsPromise = new Promise((resolve, reject) => {
  instruments["strings"] = new Tone.Sampler({
        // // 'A2' : 'A2.[mp3]',
        // // 'A3' : 'A3.[mp3]',
        // // 'A4' : 'A4.[mp3]',
        // // 'A5' : 'A5.[mp3]',
  			'A#2' : 'As2.[mp3]',
        'A#3' : 'As3.[mp3]',
        // 'A#4' : 'As4.[mp3]',
        // 'A#5' : 'As5.[mp3]',
  			// // 'B2' : 'B2.[mp3]',
        // // 'B3' : 'B3.[mp3]',
        // // 'B4' : 'B4.[mp3]',
        // // 'B5' : 'B5.[mp3]'
  			'C2' : 'C2.[mp3]',
        'C3' : 'C3.[mp3]',
        'C4' : 'C4.[mp3]',
        // 'C5' : 'C5.[mp3]',
        // 'C6' : 'C6.[mp3]',
  			// 'C#2' : 'Cs2.[mp3]',
        // 'C#3' : 'Cs3.[mp3]',
        // 'C#4' : 'Cs4.[mp3]',
        // 'C#5' : 'Cs5.[mp3]',
  			// 'D2' : 'D2.[mp3]',
        // 'D3' : 'D3.[mp3]',
        // 'D4' : 'D4.[mp3]',
        // // 'D5' : 'D5.[mp3]',
  			'D#2' : 'Ds2.[mp3]',
        'D#3' : 'Ds3.[mp3]',
        // 'D#4' : 'Ds4.[mp3]',
        // 'D#5' : 'Ds5.[mp3]',
  			// 'E2' : 'E2.[mp3]',
        // 'E3' : 'E3.[mp3]',
        // 'E4' : 'E4.[mp3]',
        // 'E5' : 'E5.[mp3]',
  			'F2' : 'F2.[mp3]',
        'F3' : 'F3.[mp3]',
        // 'F4' : 'F4.[mp3]',
        // 'F5' : 'F5.[mp3]',
  			// 'F#2' : 'Fs2.[mp3]',
        // 'F#3' : 'Fs3.[mp3]',
        // 'F#4' : 'Fs4.[mp3]',
        // 'F#5' : 'Fs5.[mp3]',
  			'G2' : 'G2.[mp3]',
        'G3' : 'G3.[mp3]',
        // // 'G4' : 'G4.[mp3]',
        // // 'G5' : 'G5.[mp3]'
  			// 'G#2' : 'Gs2.[mp3]',
        // 'G#3' : 'Gs3.[mp3]',
        // 'G#4' : 'Gs4.[mp3]',
        // 'G#5' : 'Gs5.[mp3]'
  		}, //function () {},
      {
  			'release' : 1,
        'baseUrl' : './audio/strings/',
        'onload': function () {console.log("loaded strings"); resolve("strings"); }
  			// 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
  		}).toMaster();
    });

  loadBuffersPromises.push(stringsPromise);
  //
  var celloPromise = new Promise((resolve, reject) => {
  instruments["cello"] = new Tone.Sampler({
        // // 'A2' : 'A2.[mp3]',
        // // 'A3' : 'A3.[mp3]',
        // // 'A4' : 'A4.[mp3]',
        // // 'A5' : 'A5.[mp3]',
  			'A#2' : 'As2.[mp3]',
        'A#3' : 'As3.[mp3]',
        'A#4' : 'As4.[mp3]',
        'A#5' : 'As5.[mp3]',
  			// // 'B2' : 'B2.[mp3]',
        // // 'B3' : 'B3.[mp3]',
        // // 'B4' : 'B4.[mp3]',
        // // 'B5' : 'B5.[mp3]'
  			// // 'C2' : 'C2.[mp3]',
        // 'C3' : 'C3.[mp3]',
        // 'C4' : 'C4.[mp3]',
        // 'C5' : 'C5.[mp3]',
        // 'C6' : 'C6.[mp3]',
  			'C#2' : 'Cs2.[mp3]',
        'C#3' : 'Cs3.[mp3]',
        'C#4' : 'Cs4.[mp3]',
        'C#5' : 'Cs5.[mp3]',
  			// 'D2' : 'D2.[mp3]',
        // 'D3' : 'D3.[mp3]',
        // 'D4' : 'D4.[mp3]',
        // // 'D5' : 'D5.[mp3]',
  			// 'D#2' : 'Ds2.[mp3]',
        // 'D#3' : 'Ds3.[mp3]',
        // 'D#4' : 'Ds4.[mp3]',
        // 'D#5' : 'Ds5.[mp3]',
  			'E2' : 'E2.[mp3]',
        'E3' : 'E3.[mp3]',
        // 'E4' : 'E4.[mp3]',
        // 'E5' : 'E5.[mp3]',
  			'F2' : 'F2.[mp3]',
        'F3' : 'F3.[mp3]',
        'F4' : 'F4.[mp3]',
        'F5' : 'F5.[mp3]',
  			// 'F#2' : 'Fs2.[mp3]',
        // 'F#3' : 'Fs3.[mp3]',
        // 'F#4' : 'Fs4.[mp3]',
        // 'F#5' : 'Fs5.[mp3]',
  			// // 'G2' : 'G2.[mp3]',
        // // 'G3' : 'G3.[mp3]',
        // // 'G4' : 'G4.[mp3]',
        // // 'G5' : 'G5.[mp3]'
  			'G#2' : 'Gs2.[mp3]',
        'G#3' : 'Gs3.[mp3]',
        'G#4' : 'Gs4.[mp3]',
        'G#5' : 'Gs5.[mp3]'
  		}, //function () {},
      {
  			'release' : 1,
        'baseUrl' : './audio/cello/',
        'onload': function () {console.log("loaded cello"); resolve("cello"); }
  			// 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
  		}).toMaster();
    });


    //
    // var celloPromise = new Promise((resolve, reject) => {
    // instruments["cello"] = new Tone.Sampler({
    //       'A2' : 'A2.[wav]',
    //       'A3' : 'A3.[wav]',
    //       'A4' : 'A4.[wav]',
    //       'A5' : 'A5.[wav]',
    // 			// 'A#2' : 'As2.[mp3]',
    //       // 'A#3' : 'As3.[mp3]',
    //       // 'A#4' : 'As4.[mp3]',
    //       // 'A#5' : 'As5.[mp3]',
    // 			// // 'B2' : 'B2.[mp3]',
    //       // // 'B3' : 'B3.[mp3]',
    //       // // 'B4' : 'B4.[mp3]',
    //       // // 'B5' : 'B5.[mp3]'
    // 			'C2' : 'C2.[wav]',
    //       'C3' : 'C3.[wav]',
    //       'C4' : 'C4.[wav]',
    //       'C5' : 'C5.[wav]',
    //       // 'C6' : 'C6.[mp3]',
    // 			// 'C#2' : 'Cs2.[mp3]',
    //       // 'C#3' : 'Cs3.[mp3]',
    //       // 'C#4' : 'Cs4.[mp3]',
    //       // 'C#5' : 'Cs5.[mp3]',
    // 			// 'D2' : 'D2.[mp3]',
    //       // 'D3' : 'D3.[mp3]',
    //       // 'D4' : 'D4.[mp3]',
    //       // // 'D5' : 'D5.[mp3]',
    // 			'D#2' : 'Ds2.[wav]',
    //       'D#3' : 'Ds3.[wav]',
    //       'D#4' : 'Ds4.[wav]',
    //       'D#5' : 'Ds5.[wav]',
    // 			// 'E2' : 'E2.[mp3]',
    //       // 'E3' : 'E3.[mp3]',
    //       // 'E4' : 'E4.[mp3]',
    //       // 'E5' : 'E5.[mp3]',
    // 			// 'F2' : 'F2.[mp3]',
    //       // 'F3' : 'F3.[mp3]',
    //       // 'F4' : 'F4.[mp3]',
    //       // 'F5' : 'F5.[mp3]',
    // 			'F#2' : 'Fs2.[wav]',
    //       'F#3' : 'Fs3.[wav]',
    //       'F#4' : 'Fs4.[wav]',
    //       'F#5' : 'Fs5.[wav]',
    // 			// // 'G2' : 'G2.[mp3]',
    //       // // 'G3' : 'G3.[mp3]',
    //       // // 'G4' : 'G4.[mp3]',
    //       // // 'G5' : 'G5.[mp3]'
    // 			// 'G#2' : 'Gs2.[mp3]',
    //       // 'G#3' : 'Gs3.[mp3]',
    //       // 'G#4' : 'Gs4.[mp3]',
    //       // 'G#5' : 'Gs5.[mp3]'
    // 		}, //function () {},
    //     {
    // 			'release' : 1,
    //       'baseUrl' : './audio/cello/cello/',
    //       'onload': function () {console.log("LOADED"); resolve("cello"); }
    // 			// 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
    // 		}).toMaster();
    //   });

  loadBuffersPromises.push(celloPromise);

  let pianoPromise = new Promise((resolve, reject) => {
  instruments["piano"] = new Tone.Sampler({
  			'A0' : 'A0.[mp3|ogg]',
  			'C1' : 'C1.[mp3|ogg]',
  			'D#1' : 'Ds1.[mp3|ogg]',
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
        'onload': function () {console.log("loaded piano"); resolve("piano");}
  			// 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
  		}).toMaster();
    });
  //
  // let pianoPromise = new Promise((resolve, reject) => {
  // instruments["piano"] = new Tone.Sampler({
  //   'A1' : 'piano-p-a1.wav',
  //   'A2' : 'piano-p-a2.wav',
  //   'A3' : 'piano-p-a3.wav',
  //   'A4' : 'piano-p-a4.wav',
  //   'A5' : 'piano-p-a5.wav',
  //   'A6' : 'piano-p-a6.wav',
  //   'A7' : 'piano-p-a7.wav',
  //   'C1' : 'piano-p-c1.wav',
  //   'C2' : 'piano-p-c2.wav',
  //   'C3' : 'piano-p-c3.wav',
  //   'C4' : 'piano-p-c4.wav',
  //   'C5' : 'piano-p-c5.wav',
  //   'C6' : 'piano-p-c6.wav',
  //   'C7' : 'piano-p-c7.wav',
  //   'C8' : 'piano-p-c8.wav',
  //   'D#1' : 'piano-p-ds1.wav',
  //   'D#2' : 'piano-p-ds2.wav',
  //   'D#3' : 'piano-p-ds3.wav',
  //   'D#4' : 'piano-p-ds4.wav',
  //   'D#5' : 'piano-p-ds5.wav',
  //   'D#6' : 'piano-p-ds6.wav',
  //   'D#7' : 'piano-p-ds7.wav',
  //   'F#1' : 'piano-p-fs1.wav',
  //   'F#2' : 'piano-p-fs2.wav',
  //   'F#3' : 'piano-p-fs3.wav',
  //   'F#4' : 'piano-p-fs4.wav',
  //   'F#5' : 'piano-p-fs5.wav',
  //   'F#6' : 'piano-p-fs6.wav',
  //   'F#7' : 'piano-p-fs7.wav',
  // 		}, //function () {},
  //     {
  // 			'release' : 1,
  //       'baseUrl' : './audio/salamander/piano/',
  //       'onload': function () {console.log("PIANO LOADED"); resolve("piano");}
  // 			// 'baseUrl' : 'https://github.com/Tonejs/tonejs.github.io/tree/master/examples/audio/salamander/'
  // 		}).toMaster();
  //   });

    loadBuffersPromises.push(pianoPromise);
};

chrome.tabs.onUpdated.addListener(function (tabId, info) {
  if (info.status === 'complete') {
    defineVariables();
  }
});

chrome.runtime.onMessage.addListener(

  function(request, sender, sendResponse) {
    if (!request.message.code) {
      return;
    }

    if (request.message.code === "play"){
      Tone.Transport.stop();
      Tone.Transport.cancel();
      Tone.Transport.seconds = 0;

      // console.log("playing");

      let orderedMelodies = {};
      Object.keys(request.message.melodies).sort().forEach(function(key) {
        orderedMelodies[key] = request.message.melodies[key];
      });

      // console.log("ordered = ", orderedMelodies);
      let duration = 0;
      let partDelay = 0;
      let incrementDelay = 0;
      for (let part in orderedMelodies) {
        // console.log("part = ", part);
        // let inst = new Tone.Synth();

        for (let x=0; x<orderedMelodies[part].length; ++x) {
          // console.log("x = ", x);
          // let synth = new Tone.PolySynth(orderedMelodies[part].length, Tone.Synth).toMaster();

          // synth.triggerAttackRelease("C4", "8n");

          let melody = orderedMelodies[part][x];
          let instrument = melody[1].split('_')[0];
          let synth = instruments[instrument];
          console.log("Melody = ", melody);

          if (melody.length < 3) {
            console.log("Less then 3 melody tokens");
            return;
          }
          let delay = 0;

          let normilizedMelody = [];
          for (let i = 2; i<melody.length; ++i) {
            let noteInfo = parseNote(melody[i]);
            if (!noteInfo) {
              continue;
            }

            let note = noteInfo.note;

            let obj = {
              time: delay,
              note: note,
              duration: noteInfo.duration + "n",
              velocity: 1
            }

            normilizedMelody.push(obj);
            delay += Tone.Time(noteInfo.duration + "n").toSeconds();
          }

          let part1 = new Tone.Part(function(time, value) {
            if (value.note !== "P") {
              synth.triggerAttackRelease(value.note, value.duration, time, value.velocity);
            }
          }, normilizedMelody ).start(partDelay);
          // part1.loop = 1;
          // console.log(part1);

          if (x === 0) {
            incrementDelay = delay;
          }
          // console.log("adding", incrementDelay);
        }
        partDelay += incrementDelay;
      }
      sendResponse({duration: partDelay*1000});
      Tone.Transport.schedule(function (time) {
        Tone.Transport.stop();
      }, partDelay);
      // Tone.Transport.on("stop", () => {
        // console.log("STOP");
      // });

      Promise.all(loadBuffersPromises).then(values => {
        Tone.Transport.start();
      });
      // });
    }

    if (request.message.code === "stop"){
      // console.log("stop...");
      // console.log(Tone.Transport.ticks);
      // console.log(Tone.Transport.state);
      // console.log(Tone.Transport.seconds);
      // console.log(Tone.Transport.progress);
      // console.log(Tone.Transport.position);
      // console.log("----------------");
      // console.log(Tone.context);
      // if (Tone.context) {
        Tone.Transport.stop();
        Tone.Transport.cancel();
      // console.log(Tone.Transport.ticks);
      // console.log(Tone.Transport.state);
      // console.log(Tone.Transport.seconds);
      // console.log(Tone.Transport.progress);
      // console.log(Tone.Transport.position);
      sendResponse({message: "Stopped"});
    }

    if (request.message.code === "listeners"){
      // console.log("req...", request);
      // console.log("sender...", sender);
      // console.log("id...", sender.id);

      chrome.tabs.executeScript(sender.tab.id, {file: "injected_script.js"});
    }
  }
);
