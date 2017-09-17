import Controller from "../Controller";
import WaveForm from "./WaveForm";
import EventTimes from "./EventTimes";
import WaveLooper from "./WaveLooper";

const { wave } = Controller;

export default function SoundEvent(){
    
    const position = new WaveLooper();
    const eventTimes = new EventTimes();
    
    function reset ( frequency ){
        position.set( frequency , wave.fm , wave.fmFreq );
        eventTimes.restart();
    }
    
    function next (){
        return  eventTimes.next() *  WaveForm( position.next() , wave );
    }
    
    function end(){
       eventTimes.end();
    }
    
    return { position , eventTimes , next  , reset , end };
    
}