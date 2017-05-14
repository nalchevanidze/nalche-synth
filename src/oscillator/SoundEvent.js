import Controller from "../Controller";
import WaveForm from "./WaveForm";
import EventTimes from "./EventTimes";
import WaveLooper from "./WaveLooper";

export default function SoundEvent(){
    const position = new WaveLooper();
    const eventTimes = new EventTimes();
    function reset ( frequency ){
        position.set( frequency , Controller.wave.fm );
        eventTimes.restart();
    }
    function next (){
        return  eventTimes.next() *  WaveForm( position.next() , Controller.wave );
    }
    function end(){
       eventTimes.end();
    }
    
    return { position , eventTimes , next  , reset , end };
}