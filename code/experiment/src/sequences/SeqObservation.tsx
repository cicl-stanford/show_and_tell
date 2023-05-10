import React, {createRef, RefObject} from "react";
import Sequence from "../misc/Sequence";
import CausalGraphThree from "../components/CausalGraphThree";
import {Data} from "../misc/Data";
import {Observation} from "../misc/serviceLayer";
import {Mode} from "../components/graph/Edge";
import {Button} from "primereact/button";
import {now} from "moment";
import ButtonFooter from "../components/ButtonFooter";
import ExplanationBubble from "../components/ExplanationBubble";
import {Config} from "../config";
import HistoryBar from "../components/HistoryBar";
import {Toast} from "primereact/toast";


const _ = require('lodash');

interface Props {
  data: Data
  completedCallback: () => void
  goBackCallback: () => void
  setIndex: number
  observation: Observation
  edgeAB: Mode
  edgeAC: Mode
  edgeBC: Mode
}

export default class SeqObservation extends Sequence {
  props: Props;
  refGraph: RefObject<CausalGraphThree>;
  startTime: number;
  refToast: RefObject<Toast>;
  companies: string[]
  state: {
    showGraph: boolean
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      showGraph: false
    };
    this.companies = ["Pear", "TimeY", "Macroloft", "Congo", "Smoogle", "Pricefriend", "Metal", "Smell", "Jackson & Jackson", "Testle"];
    this.refToast = createRef();
    this.refGraph = createRef();
  }

  recordResponse(responseTime: number) {
    const edgeModes = this.refGraph.current!.getEdgeModes();
    this.props.data.trialResponses.push({
      setIndex: this.props.setIndex,
      obsIndex: this.props.observation.obsIdx,
      edgeAB: edgeModes.edgeAB,
      edgeAC: edgeModes.edgeAC,
      edgeBC: edgeModes.edgeBC,
      responseTime: responseTime
    })
  }

  componentDidMount() {
    super.componentDidMount();
    this.setState({showGraph: true}, () => {
      this.startTime = now();
    });
  }

  onNext() {
    const edges = this.refGraph.current.getEdgeModes();
    let loop = edges.edgeAB == Mode.Forward && edges.edgeBC == Mode.Forward && edges.edgeAC == Mode.Backward;
    loop = loop || edges.edgeAB == Mode.Backward && edges.edgeBC == Mode.Backward && edges.edgeAC == Mode.Forward;
    if (loop) {
      this.refToast.current.show({severity: 'error',
        summary: 'Cycle Detected',
        detail: `The connections you have indicated for this device has a cycle, which is not valid.
        Please adjust the connections so that the cycle is removed.`,
        life: 10000
      });
    } else {
      const responseTime = now() - this.startTime;
      this.recordResponse(responseTime);
      this.goToNext();
    }
  }
  render() {
    const showActivations = this.props.data.experimentData.conditions.showActivations;
    const showExplanations = this.props.data.experimentData.conditions.showExplanations;
    const deviceName = this.props.data.experimentData.trialSets[this.props.setIndex].graphName;
    const obsHistory = this.props.data.experimentData.trialSets[this.props.setIndex].observations.slice(0, 1+this.props.observation.obsIdx);
    return (
      <div>
        <Toast ref={this.refToast} />
        <h1> Model <i>{deviceName}</i> </h1>
        <div>
          { this.state.showGraph
            ? <div>
                <div style={{display: 'inline-block'}}>
                  <p>
                    A <i>{deviceName}</i> model was sent to 10 different companies. Each company tested their device once.
                  </p>
                  <br/>
                  <p>
                    Please indicate your current best guess of how the model <i>{deviceName}</i> works by adding
                    (or removing) arrows between the components.
                  </p>
                </div>
                <br/>
                <br/>

                <div className='grid'>
                  <div className='col-6' style={{padding: "10px"}}>
                    <HistoryBar showActivations={showActivations}
                                showExplanations={showExplanations}
                                observations={obsHistory}
                                companies={this.companies}/>
                  </div>
                  <div className='col-6' style={{paddingLeft: "30px"}}>
                    <div>
                      {this.props.data.experimentData.conditions.showExplanations
                      && <div style={{minHeight: "105px"}}>
                        <ExplanationBubble explanation={this.props.observation.explanation}/>
                      </div>}

                      <br/>
                      <CausalGraphThree
                        width={300}
                        radius={40}
                        nodeA={showActivations && this.props.observation.activations.A}
                        nodeB={showActivations && this.props.observation.activations.B}
                        nodeC={showActivations && this.props.observation.activations.C}
                        edgeAB={this.props.edgeAB}
                        edgeAC={this.props.edgeAC}
                        edgeBC={this.props.edgeBC}
                        enableEdgeOnClick={true}
                        ref={this.refGraph} />
                    </div>
                    <br/>
                    <ButtonFooter onNext={this.onNext.bind(this)}/>
                  </div>
                </div>
              </div>
            : <div className="vertical-center">
            </div>
          }
        </div>
      </div>
    )
  }
}