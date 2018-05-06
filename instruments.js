var instruments = (function() {

	var metronome = new Tone.MembraneSynth({
		"pitchDecay" : 0,
		"octaves" : 3,
		"envelope" : {
			"attack" : 0.0006,
			"decay" : 0.5,
			"sustain" : 0
		},
		"volume" : -1
	}).toMaster();


	var bell = new Tone.MetalSynth({
		"harmonicity" : 12,
		"resonance" : 800,
		"modulationIndex" : 20,
		"envelope" : {
			"decay" : 0.4,
		},
		"volume" : -25
	}).toMaster();


	var conga = new Tone.MembraneSynth({
		"pitchDecay" : 0,
		"octaves" : 3,
		"envelope" : {
			"attack" : 0.0006,
			"decay" : 0.5,
			"sustain" : 0
		},
		"volume" : -1
	}).toMaster();

	var clave = new Tone.MetalSynth({
		"harmonicity" : 2,
		"resonance" : 8,
		"modulationIndex" : 2,
		"envelope" : {
			"decay" : 0.09,
		},
		"volume" : -18
	}).toMaster();

//	    BASS
	var bass = new Tone.MonoSynth({
		"volume" : -9,
		"envelope" : {
			"attack" : 0.03,
			"decay" : 0.3,
			"sustain" : 1,
			"release" : 2.5,
		},
		"filterEnvelope" : {
			"attack" : 0.045,
			"decay" : 0.01,
			"sustain" : 0.5,
			"baseFrequency" : 300,
			"octaves" : 1
		}
	}).toMaster();

//	    BASS2
	var bass2 = new Tone.MonoSynth({
		"volume" : -10,
		"envelope" : {
			"attack" : 0.1,
			"decay" : 0.3,
			"release" : 2,
		},
		"filterEnvelope" : {
			"attack" : 0.045,
			"decay" : 0.01,
			"sustain" : 0.5,
			"baseFrequency" : 200,
			"octaves" : 2
		}
	}).toMaster();


//		KICK
	var kick = new Tone.MembraneSynth({
		"volume" : 0,
		"envelope" : {
			"attack" : 0.005,
			"decay" : 0.8,
			"sustain" : 0.1
		},
		"octaves" : 10
	}).toMaster();

	var kick2 = new Tone.MembraneSynth({
		"volume" : -2,
		"pitchDecay" : 0.038,
		"octaves" : 4,
		"envelope" : {
			"attack" : 0.0005,
			"decay" : 0.5,
			"sustain" : 0.2,
			"release" : 0.4
		}
	}).toMaster();

//      DEFAULT MembraneSynth settings
	var drum = new Tone.MembraneSynth( {
		"volume" : -1,
		"pitchDecay" : 0.05,
		"octaves" : 10,
		"oscillator" : {
			"type":"sine"
		},
		"envelope":{
			"attack" : 0.001,
			"decay" : 0.4,
			"sustain" : 0.01,
			"release" : 1.4,
			"attackCurve":"exponential"
		}
	
	} ).toMaster();

//		SNARE
	var snare = new Tone.NoiseSynth({
		"volume" : -7,
		"envelope" : {
			"attack" : 0.001,
			"decay" : 0.3,
			"sustain" : 0.01,
			"release" : 0.01
		},
		"filterEnvelope" : {
			"attack" : 0.001,
			"decay" : 0.1,
			"sustain" : 0.01,
			"release" : 0.2
		}
	}).toMaster();


//		PIANO
	var piano = new Tone.PolySynth(4, Tone.Synth, {
		"volume" : -2,
		"oscillator" : {
			"partials" : [1, 2, 5],
		},
		"portamento" : 0.005
	}).toMaster()
	


//      Brass 
	var brass = new Tone.MonoSynth({
		"portamento": 0.01,
		"oscillator": {
			"type": "sawtooth"
		},
		"filter": {
			"Q": 2,
			"type": "lowpass",
			"rolloff": -24
		},
		"envelope": {
			"attack": 0.1,
			"decay": 0.1,
			"sustain": 0.6,
			"release": 0.5
		},
		"filterEnvelope": {
			"attack": 0.05,
			"decay": 0.8,
			"sustain": 0.4,
			"release": 1.5,
			"baseFrequency": 2000,
			"octaves": 1.5
		}
	}).toMaster();

// CoolGuy (wah Wah?)
	var coolGuy = new Tone.MonoSynth({
		"oscillator" : {
			"type" : "pwm",
			"modulationFrequency" : 1
		},
		"filter" : {
			"Q" : 6,
			"rolloff" : -24 
		},
		"envelope" : {
			"attack" : 0.025,
			"decay" : 0.3,
			"sustain" : 0.7,
			"release" : 2
		},
		"filterEnvelope" : {
			"attack" : 0.245,
			"decay" : 0.131,
			"sustain" : 0.5,
			"release" : 2,
			"baseFrequency" : 20,
			"octaves" : 7.2,
			"exponent" : 2
		}
	}).toMaster();



//      Marimba
	var marimba = new Tone.Synth({
		"oscillator": {
			"partials": [
				1,
				0,
				2,
				0,
				3
			]
		},
		"envelope": {
			"attack": 0.001,
			"decay": 1.2,
			"sustain": 0,
			"release": 1.2
		}
	}).toMaster();


//      SteelPan
	var steelPan = new Tone.Synth({
		"oscillator": {
			"type": "fatcustom",
			"partials" : [0.2, 1, 0, 0.5, 0.1],
			"spread" : 40,
			"count" : 3
		},
		"envelope": {
			"attack": 0.001,
			"decay": 1.6,
			"sustain": 0,
			"release": 1.6
		}
	}).toMaster();


// TreeTrunk (kalimba?)
	var treeTrunk = new Tone.Synth({
		"oscillator": {
			"type": "sine"
		},
		"envelope": {
			"attack": 0.001,
			"decay": 0.1,
			"sustain": 0.1,
			"release": 1.2
		}
	}).toMaster();

// Electric Cello
	var electricCello = new Tone.FMSynth({
		"harmonicity": 3.01,
		"modulationIndex": 14,
		"oscillator": {
			"type": "triangle"
		},
		"envelope": {
			"attack": 0.2,
			"decay": 0.3,
			"sustain": 0.4,
			"release": 1.2
		},
		"modulation" : {
			"type": "square"
		},
		"modulationEnvelope" : {
			"attack": 0.01,
			"decay": 0.5,
			"sustain": 0.2,
			"release": 0.1
		}
	}).toMaster();


// Kalimba
	var kalimba = new Tone.FMSynth({
		"harmonicity":8,
		"modulationIndex": 2,
		"oscillator" : {
			"type": "sine"
		},
		"envelope": {
			"attack": 0.001,
			"decay": 2,
			"sustain": 0.1,
			"release": 0.8
		},
		"modulation" : {
			"type" : "square"
		},
		"modulationEnvelope" : {
			"attack": 0.002,
			"decay": 0.2,
			"sustain": 0,
			"release": 0.2
		}
	}).toMaster();


// Harmonics (better name?)
	var harmonics = new Tone.AMSynth({
		"harmonicity": 3.999,
		"oscillator": {
			"type": "square"
		},
		"envelope": {
			"attack": 0.03,
			"decay": 0.3,
			"sustain": 0.7,
			"release": 0.8
		},
		"modulation" : {
			"volume" : 12,
			"type": "square6"
		},
		"modulationEnvelope" : {
			"attack": 2,
			"decay": 3,
			"sustain": 0.8,
			"release": 0.1
		}
	}).toMaster();


// BassGuitar
	var bassGuitar = new Tone.MonoSynth({
		"oscillator": {
			"type": "fmsquare5",
			"modulationType" : "triangle",
			"modulationIndex" : 2,
			"harmonicity" : 0.501
		},
		"filter": {
			"Q": 1,
			"type": "lowpass",
			"rolloff": -24
		},
		"envelope": {
			"attack": 0.01,
			"decay": 0.1,
			"sustain": 0.4,
			"release": 2
		},
		"filterEnvelope": {
			"attack": 0.01,
			"decay": 0.1,
			"sustain": 0.8,
			"release": 1.5,
			"baseFrequency": 50,
			"octaves": 4.4
		}
	}).toMaster();

// DelicateWindPart
	var softWindPart = new Tone.Synth({
		"portamento" : 0.0,
		"oscillator": {
			"type": "square4"
		},
		"envelope": {
			"attack": 2,
			"decay": 1,
			"sustain": 0.2,
			"release": 2
		}
	}).toMaster();

// Returned Instrument set
		return {
		    metronome: metronome,
		    clave: clave,
		    bell: bell,
		    conga: conga,
		    drum: drum,
		    kick: kick,
		    kick2: kick2,
		    snare: snare,
		    piano: piano,
		    bass: bass,
		    bass2: bass2,
		    brass: brass,
		    steelPan: steelPan,
		    marimba: marimba,
		    coolGuy: coolGuy,
		    treeTrunk: treeTrunk,
		    electricCello: electricCello,
		    kalimba: kalimba,
		    harmonics: harmonics,
		    bassGuitar: bassGuitar,
		    softWindPart: softWindPart
		};

})();
