import Context from "../Context";
const {sampleRate} = Context;

function Rescale ( value , deep ){
    deep = 2/(deep**2);
    return (value + deep)/ deep
}

let LFO = 0;
export default class WaveLooper {
    constructor(){
        this.freq = 0 ;
        this.next = this.next.bind(this);
        this.state = 0;
        this.stepSize =  0.1;
        this.FM={  
            state: 0,
            level: 0 
        }

    }
    set( freq = 440 , FMLevel = 1 ){
        this.freq = freq ;
        this.state = 0;
        this.stepSize =  freq  / sampleRate ;
        this.FM.state = 0;
        this.FM.level = FMLevel;
    }
    next () {
     let { state , stepSize , FM } = this;

     this.state += this.stepSize;
     this.state = this.state%1;
     if(FM.level === 0) return this.state;

     FM.state = ( FM.state += this.stepSize );
     return this.state * Rescale(Math.sin(FM.state),FM.level);

    }
}