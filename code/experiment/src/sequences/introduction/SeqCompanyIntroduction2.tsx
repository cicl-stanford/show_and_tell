import React, {createRef, RefObject} from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Mode} from "../../components/graph/Edge";
import {Data} from "../../misc/Data";

import { Toast } from 'primereact/toast';
import ButtonFooter from "../../components/ButtonFooter";
import _ from "lodash";
import {Observation} from "../../misc/serviceLayer";
import {RadioButton} from "primereact/radiobutton";

export default class SeqCompanyIntroduction2 extends Sequence {
    state: {selected: number}
    refToast: RefObject<Toast>;
    companies: string[];

    constructor(props: any) {
        super(props);
        this.refToast = createRef();
        this.state = { selected: null };
        this.companies = ["Pear", "TimeY", "Macroloft", "Congo", "Smoogle", "Pricefriend", "Metal", "Smell", "Jackson & Jackson", "Testle"];
    }

    onSubmit() {
            this.goToNext();
    }

    render() {
        const edges = [
            {edgeAB: Mode.Forward, edgeAC: Mode.Backward},
            {
                edgeAB: this.props.data.experimentData.tutorial.edgeAB,
                edgeAC: this.props.data.experimentData.tutorial.edgeAC,
                edgeBC: this.props.data.experimentData.tutorial.edgeBC
            },
            {}
        ]
        return (
            <div>
                <Toast ref={this.refToast} />

                <h1>Models and Companies</h1>
                <p>
                    During each trial of the experiment, these <b>companies</b> will be testing the same <b>model</b>  of device.
                    <br/>
                    <br/>
                </p>
                <br/>
                <div className="grid">
                    {_.map(this.props.data.experimentData.tutorial.observations.slice(0, 5),
                        (obs: Observation) => <div className="col">
                            <div style={{marginBottom: 8}}><h4>{this.companies[obs.obsIdx]}</h4></div>
                        </div>)}
                </div>
                <br/>
                <div className="grid">
                    {_.map(this.props.data.experimentData.tutorial.observations.slice(5, 10),
                        (obs: Observation) => <div className="col">
                            <div style={{marginBottom: 8}}><h4>{this.companies[obs.obsIdx]}</h4></div>
                        </div>)}
                </div>
                <br/>
                <p>
                    Each company  will be testing a different device, but every device will be of the same model.
                    Since every model has the same causal structure, it's possible to learn how the model works
                    by analyzing results from many different companies.
                    <br/>
                    <br/>
                </p>
                <br/>
                <br/>
                <ButtonFooter onBack={this.goToPrev} onNext={this.onSubmit.bind(this)}/>
            </div>
        );
    }
}