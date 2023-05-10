import Sequence from "../misc/Sequence";
import {Data} from "../misc/Data";
import {TrialSet} from "../misc/serviceLayer";
import SeqObservation from "./SeqObservation";
import React from "react";
import {Mode} from "../components/graph/Edge";
import SeqSetComplete from "./SeqSetComplete";


interface Props {
  data: Data
  completedCallback: () => void
  goBackCallback: () => void
  trialSet: TrialSet
}

export default class SeqCausalGraphInference extends Sequence {

  constructor(props: Props) {
    super(props);

    for (let observation of props.trialSet.observations) {
      this.addSubsequence(SeqObservation,
        {
          setIndex: props.trialSet.setIndex,
          observation: observation,
          key: `obs_${this.props.trialSet.setIndex}.${observation.obsIdx}`
        },
        this.getLastResponse.bind(this));
    }
    this.addSubsequence(SeqSetComplete, {
      trialSet: this.props.trialSet,
      isLastSet: this.props.trialSet.setIndex === this.props.data.experimentData.trialSets.length - 1,
      companies: ["Pear", "TimeY", "Macroloft", "Congo", "Smoogle", "Pricefriend", "Metal", "Smell", "Jackson & Jackson", "Testle"]
    });
  }

  onGoToNext() {
    this.props.data.post(false);
  }

  /**
   *  returns an object with {edgeAB: Mode, edgeAC: Mode, edgeBC: Mode}
   */
  getLastResponse() {
    const responses = this.props.data.trialResponses;
    if (responses.length === 0
      || responses[responses.length-1].setIndex !== this.props.trialSet.setIndex) {
      return {edgeAB: Mode.None, edgeAC: Mode.None, edgeBC: Mode.None}
    } else {
      const response = responses[responses.length-1];
      return {
        edgeAB: response.edgeAB,
        edgeAC: response.edgeAC,
        edgeBC: response.edgeBC
      }
    }
  }
}