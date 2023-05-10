import React from 'react';
import Sequence from "../misc/Sequence";
import SeqCausalGraphInference from "./SeqCausalGraphInference";
import SeqEnd from "./SeqEnd";
import SeqIntroduction from "./introduction/SeqIntroduction";
import SeqExitSurvey from "./exit_survey/SeqExitSurvey";
import SeqTrialsStart from "./SeqTrialsStart";
import SeqConditions from "./SeqConditions";
import {CONFIG} from "../config";
import {getUrlParams} from "../misc/utils";

class SeqMain extends Sequence {

  constructor(props: any) {
    super(props);

    if (!(CONFIG.dev_mode && getUrlParams()['skipIntro'])) {
      this.addSubsequence(SeqIntroduction);
    }
    this.addSubsequence(SeqTrialsStart);
    this.addSubsequence(SeqConditions);

    for (let trialSet of props.data.experimentData.trialSets) {
      this.addSubsequence(SeqCausalGraphInference,
        {trialSet: trialSet,
          key: `seqCGI_${trialSet.setIndex}`});
    }
    this.addSubsequence(SeqExitSurvey);
    this.addSubsequence(SeqEnd);
  }
}

export default SeqMain;