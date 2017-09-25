import Context from "../Context";
const { sampleRate } = Context;
import Controller from "../Controller";

function Rescale(value, deep) {
    deep = 2 / (deep ** 2);
    return (value + deep) / deep
}

let LFO = 0;

export default class WaveLooper {

    constructor() {
        this.freq = 0;
        this.next = this.next.bind(this);
        this.state = 0;
        this.stepSize = 0.1;
        this.FM = {
            state: 0,
            level: 0,
            freq: 0.25
        }
    }

    set(freq = 440, FMLevel = 1, FMFreq) {



        this.FM.freq = (FMFreq !== undefined) ?
            FMFreq * 4 : this.FM.freq;
        
        if(this.FM.freq === 0 ) {
            this.FM.freq = 1/16;
        }

        this.freq = freq;
        this.state = 0;

        //unision
       // this.state = Math.random();
        this.state = Controller.wave.offset;

        //this
        this.stepSize = freq / sampleRate;
        this.FM.stepSize = this.stepSize * this.FM.freq;
        this.FM.state = 0;
        this.FM.level = FMLevel;
    }

    next() {

        let { state, stepSize, FM } = this;

        // generate new wavePosition
        state += stepSize;
        this.state = state % 1;

        // new Fm Position
        if (FM.level === 0) return state;
        FM.state = (FM.state += FM.stepSize);
        const FMWaveFormPosition = Math.sin(FM.state);

        return this.state * Rescale(FMWaveFormPosition, FM.level);

    }
}
