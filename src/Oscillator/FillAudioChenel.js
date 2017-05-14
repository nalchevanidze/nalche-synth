export default function FillAudioChenel(out , SoundEvents ) {
     let i, { length } = out ;
     for (i = 0; i < length; ++i ) { 
           let value = 0;
           
           // to sum all sound events
           for (let event of SoundEvents ){
               value += event.next();
           }
           value = value / SoundEvents.length ;

           let l =  Math.min( Math.max( Number.isNaN(value)? 0 : value , -1) , 1);
          out[i] = l;
      }

}