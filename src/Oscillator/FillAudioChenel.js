export default function FillAudioChenel(out , Sound ) {
     let i, { length } = out ;
     for (i = 0; i < length; ++i ) { 
           let value = Sound.next();
           let l =  Math.min( Math.max( Number.isNaN(value)? 0 : value , -1) , 1);
          out[i] = l;
      }

}