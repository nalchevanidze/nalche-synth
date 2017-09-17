import React from "react";
import GridLine from "../GridLine";

const EnvelopeGraphic = ({ attack, release , sustain ,decay }) => {

    attack = (10 + attack * 80);
    decay = (attack + decay * 80);
    let sustainX = decay + 20;
    sustain = (1 - sustain) * 100;
    release = (sustainX + release * 80);

    let point_attack = [attack , 100] ;
    let point_sustain = [sustainX , sustain];

    let point_sustain_down = [sustainX , 100];
    let point_attack_down = [attack , 100];
    
    let Line_attack = [
        
        [attack, 0 ], 
        [attack , 100] 
        
    ];
    
    let Line_sustain = [
        
        [sustainX , 100] , 
        [sustainX , sustain] 
        
    ];

    return (
        <svg viewBox="0 -10 200 110" width="120px" height="80px" >
            <GridLine />
            <path id="attack" d={ "M" + [0 ,100 ,10 ,100, ...Line_attack , 0 , 100] } fill="#444" fillOpacity="0.1" />
            <path id="sustain" d={"M" + [...Line_attack.reverse() , decay , sustain ,...Line_sustain.reverse() ]} fill="#444" fillOpacity="0.15" />
            <path id="release" d={"M" + [ ...Line_sustain, release, 100]} fill="#444" fillOpacity="0.1" />

            <g stroke="#444" fill="none" strokeWidth="0.25" >
                <path d={"M"+[decay,sustain,decay,100] } />
                <path d={"M"+Line_attack } />
                <path d={"M"+Line_sustain} />
                <path d={"M" [0, 100 ,10 ,100 , attack , 0 , sustainX, sustain , release , 100, 200 ,100] } />
            </g>
        </svg>
    )
}

export default EnvelopeGraphic;

