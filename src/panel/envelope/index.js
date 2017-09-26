import React from "react";
import Controller from "../../Controller";
import EnvelopeGraphic from './EnvelopeGraphic';
import ButtonWave from "../ButtonWave";
import radium from 'radium';

const styles = {
    button: {
        border: "1px solid #222",
        width: "50%",
        ":hover": {
            background: "#555",

        }
    }
};

const Button = ({ id, active, onClick }) =>
    <button
        style={{
            ...styles.button,
            color: (id === active) ? "#FFA928" : "gray"
        }}
        onClick={() => onClick(id)}
    >
        {id}
    </button >
;


class PanelEnvelope extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = { active: "volume" };
        this.switch = this.switch.bind(this);
    }
    switch(active) {
        this.setState({ active });
    }
    render() {
        let { active } = this.state;
        let { envelope, env } = Controller;
        return (
            <div className="envelope" >
                <h1> envelope </h1>
                <div className="selector" >
                    <Button id="volume" active={active} onClick={this.switch} />
                    <Button id="filter" active={active} onClick={this.switch} />
                </div>
                <EnvelopeGraphic state={
                    (
                        active == "filter") ?
                        env.filter : envelope
                }
                />
            </div>
        );
    }
}

export default radium(PanelEnvelope);