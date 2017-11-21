import * as React from "react";
import { ComponentClass, ReactElement } from "react";


export interface Note {
    at: number;
    id:string;
    length: number;
}

export type Quarter = Note[];
export type SingleSequence = number[];

export interface NalcheSynthProps {
    sequence?: SingleSequence[],
    midi?: Quarter[],
}

export default class NalcheSynth 
    extends React.Component<NalcheSynthProps,{}> { 

}