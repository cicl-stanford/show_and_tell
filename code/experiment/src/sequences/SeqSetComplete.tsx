import React from 'react';
import Sequence from "../misc/Sequence";
import CausalGraphThree from "../components/CausalGraphThree";
import {Data} from "../misc/Data";
import {TrialSet} from "../misc/serviceLayer";
import {toUSD} from "../misc/utils";
import {CONFIG} from "../config";
import ButtonFooter from "../components/ButtonFooter";
const _ = require('lodash');

interface Props {
  data: Data
  completedCallback: () => void
  trialSet: TrialSet
  companies: string[]
  isLastSet: boolean
}

export default class SeqSetComplete extends Sequence {

  props: Props;

  getTrialResults(idxLow: number, idxHigh: number) {
    const showActivations = this.props.data.experimentData.conditions.showActivations;
    const showExplanations = this.props.data.experimentData.conditions.showExplanations;

    const responses = _.filter(this.props.data.trialResponses, (r) => r.setIndex == this.props.trialSet.setIndex);
    return <div className="grid">
      {_.map(_.zip(this.props.trialSet.observations, responses).slice(idxLow, idxHigh),
        (obs_res) => {
          const observation = obs_res[0];
          const response = obs_res[1];
          return <div className="col" key={`day${idxLow + observation.obsIdx}`}>
            <div style={{marginBottom: 8}}><h4> {this.props.companies[observation.obsIdx]}</h4></div>

            <CausalGraphThree
              width={100}
              radius={18}
              nodeA={showActivations && observation.activations.A}
              nodeB={showActivations && observation.activations.B}
              nodeC={showActivations && observation.activations.C}
              edgeAB={response.edgeAB}
              edgeAC={response.edgeAC}
              edgeBC={response.edgeBC}
            />
            {showExplanations && <div>{observation.explanation.stringify()}</div>}
          </div>
        }
      )}
    </div>
  }

  render() {

    const numSolvedAll = this.props.data.getNumEdgesSolved();
    const numSolved = numSolvedAll[this.props.trialSet.setIndex];
    const totalSolved = _.sum(numSolved);
    const total = 3 * numSolved.length;
    const cumTotalSolved = this.props.data.getTotalEdgesSolved();

    return (
      <div>
        <h1><i>{this.props.trialSet.graphName}</i> Model Results</h1>

        <p>
          You have completed {1 + this.props.trialSet.setIndex} out of {this.props.data.experimentData.trialSets.length} sets.
          You correctly identified the correct causal connections for this model {totalSolved} times
          out of {total} possible across all 10 companies
          for a total of {toUSD(totalSolved * CONFIG.reward_per_edge)}.
          Your cumulative total is {toUSD(cumTotalSolved * CONFIG.reward_per_edge)}.
          These were your responses to the devices you observed.
        </p>
        <br/>
        {this.getTrialResults(0, 5)}
        <br/>
        {this.getTrialResults(5, 10)}
        <br/>
        <p>
          This is how the <i>{this.props.trialSet.graphName}</i> model works:
        </p>
        <br/>
        <CausalGraphThree
          width = {200}
          radius = {30}
          edgeAB = {this.props.trialSet.edgeAB}
          edgeAC = {this.props.trialSet.edgeAC}
          edgeBC = {this.props.trialSet.edgeBC}
        />
        <br/><br/>
        <ButtonFooter onNext={this.goToNext.bind(this)}/>
      </div>
    );
  }
}