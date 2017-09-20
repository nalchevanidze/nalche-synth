import Controller from "../Controller";
import WaveForm from "./WaveForm";
import EventTimes from "./EventTimes";
import WaveLooper from "./WaveLooper";

const { wave } = Controller;

export default function SoundEvent(){
    
    const position = new WaveLooper();
    const eventTimes = new EventTimes();
    let oldvalue = 0;
    
    function reset ( frequency ){
        position.set( frequency , wave.fm , wave.fmFreq );
        eventTimes.restart();
    }
    
    function next (){
        let newValue = eventTimes.next() *  WaveForm( position.next() , wave );
        return  ( 

            oldvalue + (newValue - oldvalue)/2  

        );
    }
    
    function end(){
       eventTimes.end();
    }
    
    return { position , eventTimes , next  , reset , end };
    
}