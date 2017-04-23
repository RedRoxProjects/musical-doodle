var audio = new maximJs.maxiAudio();
audio.play = playLoop;
audio.init();

var arg;

maximEx.filter();

var sample = new maximJs.maxiSample();
var pitchshifter = new maximJs.maxiPitchShift();
var timestretcher = new maximJs.maxiTimestretch();
var sampleplayerset = false;

console.log(maximEx);

audio.loadSample("pianoMelody.mp3", sample);

window.onload = function() {

        var lowPass = document.getElementById('lowPass');
        var pitchShift = document.getElementById('pitchShift');
        var timeShift = document.getElementById('timeShift');

        lowPass.onclick = function(){
        	arg = 0;
        }
        pitchShift.onclick = function(){
        	arg = 1;
        }
        timeShift.onclick = function(){
        	arg = 2;
        }
    }


function playLoop(){
	if (!sampleplayerset){
		pitchshifter.setSample(sample);
		timestretcher.setSample(sample);
		sampleplayerset = true
	}
	if (sample.isReady()) {
		if (arg == 0) {
			var freq = mouseX/width * 3800 + 200;
			// console.log(freq);
			this.output = maximEx.lowpass(sample.play(), freq);
		}
		if (arg == 1) {
			var a = map(mouseX, 0, width, 0, 2);
			this.output = pitchshifter.play(a, 0.1, 2, 0);
		} 
		if (arg == 2) {
			var a = map(mouseX, 0, width, 0, 2);
			this.output = timestretcher.play(a, 0.1, 2, 0);
		}	
	} else { 
		this.output = 0;
	}
}

function setup(){
	var canvas = createCanvas(500, 500);
	canvas.parent('sketch-holder');
}

function draw(){
	background(0);
	fill(255);
	text(mouseX+", "+mouseY, 20, 20);
}
