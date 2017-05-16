import EnvelopeParameter from "./EnvelopeParameter";
import Controller from "../Controller";


export default class EventTimes {
    constructor (){
        this.atack = null ;
        this.release = null ;
        this.live = false ;
        this.sustain = 0 ;
        this.active =  false; 
        this.volume = 0;
        this.restart = this.restart.bind(this);
        this.next = this.next.bind(this);
        this.end = this.end.bind(this);
        this.StepUpdate = this.StepUpdate.bind(this);
        this.state = null ;
    }
    StepUpdate({ done, value },NextState){
        this.volume = value ;
        if(done) this.state = NextState;
        return this.volume;
    }
    next(){
        // if Inactive
        if(!this.live) return 0 ;
        //  Pressed 
        if( this.active  ){
                if(this.state === null){
                    this.attack = this.attack || EnvelopeParameter( Controller.envelope.attack , 0 ,1 );
                    let attack = this.attack.next();
                    return this.StepUpdate(attack,"decay");
                }
                else if(this.state === "decay"){
                    this.decay = this.decay || EnvelopeParameter( Controller.envelope.decay , this.volume  , this.sustain );
                    let decay = this.decay.next();
                    return this.StepUpdate(decay,"release");
                }
        } 

        // After Press
        if(this.active ) return this.volume ; 
        this.release = this.release || EnvelopeParameter( Controller.envelope.release , this.volume  , 0 );
        let release = this.release.next();
        this.live = !release.done ;
        return release.value ;
    }
    restart(){
        let { attack, release , decay , sustain } = Controller.envelope ;
        this.live = true ;
        this.state = null ;
        this.active = true ;
        this.sustain = sustain;
        this.volume = 1;
        this.attack = null;
        this.release = null ;
        this.decay = null ;
    }
    end(){
        this.active = false ;
    }
}

