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

export default class SeqCompanyIntroduction3 extends Sequence {
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
            In the example below, each company tests their own <i>Dax 8200</i>, and they get the following results.
            Components that activated are shown in yellow, and components that didn't activate are shown in gray.
          <br/><br/>
        </p>
        <br/>
        <div className="grid">
          <div className="col">
              <div style={{marginBottom: 8}}><h4>{this.companies[0]}</h4></div>
              <CausalGraphThree
                width={100}
                radius={18}
                nodeA={true}
                nodeB={true}
                nodeC={false}
              />
            </div>
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[1]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={true}
                    nodeB={false}
                    nodeC={false}
                />
            </div>
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[2]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={false}
                    nodeB={false}
                    nodeC={false}
                />
            </div>
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[3]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={true}
                    nodeB={true}
                    nodeC={true}
                />
            </div>
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[4]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={false}
                    nodeB={false}
                    nodeC={false}
                />
            </div>
        </div>
        <br/>
        <div className="grid">
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[5]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={true}
                    nodeB={true}
                    nodeC={false}
                />
            </div>
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[6]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={true}
                    nodeB={true}
                    nodeC={true}
                />
            </div>
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[7]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={false}
                    nodeB={true}
                    nodeC={true}
                />
            </div>
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[8]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={true}
                    nodeB={true}
                    nodeC={true}
                />
            </div>
            <div className="col">
                <div style={{marginBottom: 8}}><h4>{this.companies[9]}</h4></div>
                <CausalGraphThree
                    width={100}
                    radius={18}
                    nodeA={true}
                    nodeB={false}
                    nodeC={false}
                />
            </div>
        </div>
        <br/>
        <p>
          From these results, we could infer that the <i>Dax 8200</i> might work like this:
            <br/>
            <br/>
        </p>
          <div className="grid">
              <div className="col-4">
              </div>
              <div className="col-4">
                  <br/>
                  <CausalGraphThree
                      width={250}
                      radius={35}
                      edgeAB={Mode.Backward}
                      edgeBC={Mode.Backward}
                      nodeA={false}
                      nodeB={false}
                      nodeC={false}
                  />
              </div>
              <div className="col-4">
              </div>
          </div>
        <br/>
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}