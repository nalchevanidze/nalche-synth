export default function FillAudioChenel(out , NextStep ) {
     let i, { length } = out ;
     for (i = 0; i < length; ++i ) { 
           let value = NextStep();
           let l =  Math.min( Math.max( Number.isNaN(value)? 0 : value , -1) , 1);
          out[i] = l;
      }

}