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

export default class SeqInstructionsTask extends Sequence {
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
    if (this.state.selected === null) {
      this.refToast.current!.show({severity: 'error',
        summary: 'Incorrect',
        detail: 'Please select a causal device.'});
    } else {
      this.goToNext();
    }
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

        <h1>Inferring the Connectivity</h1>
        <p>
            10 companies are testing their devices, each of which are <i>Cor 3000</i>'s. Each company receives 1 device, and tests it once.
            Your task is to figure out how the <i>Cor 3000</i> works: how are the components connected to each other?
          <br/><br/>
          Below are observations from each company for the <i>Cor 3000</i>.
          Components that activated are shown in yellow, and components that didn't activate are shown in gray.
        </p>
        <br/>
        <div className="grid">
          {_.map(this.props.data.experimentData.tutorial.observations.slice(0, 5),
            (obs: Observation) => <div className="col">
              <div style={{marginBottom: 8}}><h4>{this.companies[obs.obsIdx]}</h4></div>
              <CausalGraphThree
                width={100}
                radius={18}
                nodeA={obs.activations.A}
                nodeB={obs.activations.B}
                nodeC={obs.activations.C}
              />
            </div>)}
        </div>
        <br/>
        <div className="grid">
          {_.map(this.props.data.experimentData.tutorial.observations.slice(5, 10),
            (obs: Observation) => <div className="col">
              <div style={{marginBottom: 8}}><h4>{this.companies[obs.obsIdx]}</h4></div>
              <CausalGraphThree
                width={100}
                radius={18}
                nodeA={obs.activations.A}
                nodeB={obs.activations.B}
                nodeC={obs.activations.C}
              />
            </div>)}
        </div>
        <br/>
        <p>
          Based on the observations above, how do you think the <i>Cor 3000</i> works?
        </p>
        <br/>
        <div className="grid">
        {_.map(edges, (e: any, idx: number) =>
          <div className="col">
            <div>
              <CausalGraphThree
                width={200}
                radius={30}
                edgeAB={e.edgeAB}
                edgeAC={e.edgeAC}
                edgeBC={e.edgeBC}
              />
            </div>
            <RadioButton
              name="graph"
              inputId={`graph${idx}`}
              value=''
              onChange={(e) => this.setState({selected: idx})}
              checked={this.state.selected == idx}
            />
          </div>
        )}
        </div>
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}