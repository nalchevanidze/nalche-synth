import EnvelopeParameter from "../EnvelopeParameter";
EnvelopeParameter.__Rewire__("sampleRate", 4  );
describe("EnvelopeParameter : increase from 0 to 0.5",()=>{

    let event = EnvelopeParameter( 1 , 0, 0.5 );
    it("call > 1: must: 0.125 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.125 , done: false } ) ;
    })
    it("call > 2: must: 0.25 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.25, done: false } ) ;
    })
    it("call > 3: must: 0.375 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.375, done: false } ) ;
    })
    it("call > 4: must: 0.5 and Done ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.5, done: true } ) ;
    })
});

describe("EnvelopeParameter : Decrease from 1 to 0.5",()=>{

    let event = EnvelopeParameter( 1 , 1 , 0.5 );
    it("call > 1: must: 0.875 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.875 , done: false } ) ;
    })
    it("call > 2: must: 0.75 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.75, done: false } ) ;
    })
    it("call > 3: must: 0.625 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.625, done: false } ) ;
    })
    it("call > 4: must: 0.5 and Done ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.5, done: true } ) ;
    })
});

describe("EnvelopeParameter : Decrease Main",()=>{

    let event = EnvelopeParameter( 1  );
    it("call > 1: must: 0.75 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.75 , done: false } ) ;
    })
    it("call > 2: must: 0.5 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.5, done: false } ) ;
    })
    it("call > 3: must: 0.25 ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0.25, done: false } ) ;
    })
    it("call > 4: must: 0 and Done ",()=>{
         let procent = event.next();
         expect(procent).to.deep.equal( { value: 0, done: true } ) ;
    })
});