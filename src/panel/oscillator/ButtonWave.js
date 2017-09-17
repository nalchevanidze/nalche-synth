import React from "react";
import ReactDOM from "react-dom";
import lib from "./icons";


function SvgCoordinates(svg, event) {
	let {
		clientX,
		clientY
	} = event;
	var point = svg.createSVGPoint();
	point.x = clientX;
	point.y = clientY;
	return point.matrixTransform(svg.getScreenCTM().inverse());
}

function safeValue (){
	
	
}

class ButtonWave extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			level: false,
			gain: 0.75
		}
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

	levelMove(event, ...e) {
		
		
		
		
		if (event.type === "touchmove") {
			event = event.touches[0]
		}


		if (!this.hide) {
			if (this.state.levelmove) {
				
				let { x, y } = SvgCoordinates(this.target, event);
				

				
				const value = 1 - Math.min((Math.max(y - 5, 0) / 80), 1);
				
				console.log( value );

	
				this.props.target[this.props.id] = value;
				
			}
		}
	}

	listenLevel(switcher, event) {
		if (!this.hide) {
			this.setState({
				levelmove: switcher
			})
		}
	}

	render() {

		let {
			id,
			target
		} = this.props;
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
				
				
				
				<circle 
					strokeWidth={0.7} 
					cx={50} 
					cy={50} 
					r={45}  
					strokeDasharray={[2,18]} 
					opacity={0.6}
				/>
				
				<circle 
					strokeWidth={0.4} 
					cx={50} 
					cy={50} 
					r={45}  
					strokeDasharray={285} 
					strokeDashoffset={285*(1-level)} 
				/>
			
			  </g>
			  
		  </svg>
		)
	}
}

export default ButtonWave;
