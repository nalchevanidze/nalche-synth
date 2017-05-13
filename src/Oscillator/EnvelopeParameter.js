import context from "../Context";
let {sampleRate} = context;

export default function *EnvelopeParameter ( life = 0.5 , start_value = 1  , end_value = 0 ){
        if(life == 0 ) return end_value ;
        // difference Size
        let size =  end_value - start_value;
        // Curve Forme
        let curve = 1 ;
        // LifeTime Samples
        life = life * sampleRate;
        // Main Cyrcle
        let left = 0 ;
        while( ++left < life ){
              // Level Modyfied by Curve
              let level = ( left / life ) ** curve ;

              yield  start_value + size *level ;
        }
        return end_value;
}