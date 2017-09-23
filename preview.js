import React from "react";
import ReactDOM from "react-dom";
import Synth from "./dist";
var stage = document.getElementById('page');
import "./src/styles/index.scss";

ReactDOM.render( 
    <Synth /> , document.getElementById('page')
);

