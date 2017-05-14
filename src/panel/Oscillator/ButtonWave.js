import React  from "react";
import ReactDOM from "react-dom";

function SvgCoordinates (svg , event ){
      let{ clientX , clientY } = event;
      var point = svg.createSVGPoint();
      point.x = clientX; 
      point.y = clientY;
      return point.matrixTransform(svg.getScreenCTM().inverse());
}

const lib = {
   saw: [ 0 , 0.5 , 0 , 0 , 1 , 1, 1 , 0.5 ],
   square: [ 0 , 0.5 , 0 , 0 , 0.5 , 0, 0.5, 1 , 1 ,1 , 1 ,0.5 ],
   saw2: [ 0 , 0.5 , 0 , 0 , 0.5 , 1, 0.5 , 0  , 1 , 1, 1 , 0.5 ]
}

function FunctionalWave( func ){
    return Array.from({length:40}, (e,i)=> (30+i) + " " + (30+func(i/40)*40) )
}

lib.noise = "M" + FunctionalWave( Math.random );
lib.sine = "M" + FunctionalWave( e=> Math.sin(e*2*Math.PI)/2+0.5 );
lib.saw = rescale ( lib.saw );
lib.saw2 = rescale ( lib.saw2 );
lib.square = rescale ( lib.square );
lib.tech = "M" + FunctionalWave( i=> {
    let wave = 0.5;
    if( i < 0.15) wave = Math.min( ( 0.05 - i % 0.05) * 50 -0.7   , 1 ) - 0.5;
    return wave;
});

lib.fm = lib.sine;

function rescale ( vector ){
   return "M" + vector.map( value=> 30+value*40 );
}


class ButtonWave extends React.Component {
    constructor(props) {
        super(props);
        this.state = { level: false, gain: 0.75 }
        this.hide = false;
        this.levelMove = this.levelMove.bind(this);
        this.mouseUp = this.listenLevel.bind(this, false);
        this.mouseDown = this.listenLevel.bind(this, true);
    }
    componentDidMount() {
        this.hide = false;
        this.target = ReactDOM.findDOMNode(this);
    }
    componentWillUnmount() {
         this.hide = true;
         this.target = null; 
    }
    levelMove(event , ...e ) {

        if(event.type === "touchmove"){ event = event.touches[0]  }


        if (!this.hide) {
            if (this.state.levelmove) {
                let { x, y } = SvgCoordinates( this.target , event );
                this.props.target[this.props.id] = 1 - Math.min( ( Math.max(y-5,0) / 80) , 1);
            }
        }
    }
    listenLevel( switcher , event ) {
        if (!this.hide) {
            this.setState({ levelmove: switcher })
        }
    }
    render() {
        let { id , target } = this.props;
        let level = target[id];
        return (
          <svg
            draggable={false} 
            viewBox="0 0 100 100"
            className="wave-button" 
            onMouseLeave={this.mouseUp} 
            onTouchStart={ this.mouseDown }  
            onTouchEnd={ this.mouseUp }
            onMouseDown={ this.mouseDown } 
            onMouseUp={ this.mouseUp }
            onMouseMove={ this.levelMove }
            onTouchMove={ this.levelMove }
          >
              <g fill="none" stroke="#222" >
                <path d={lib[id]} />
                <circle strokeWidth={0.4} cx={50} cy={50} r={45}  strokeDasharray={285} strokeDashoffset={285*(1-level)} />
              </g>
          </svg>
        )
    }
}


export default ButtonWave;