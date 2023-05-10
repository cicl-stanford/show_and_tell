import React from 'react';
import Sequence from "../../misc/Sequence";
import SeqExitSurvey1 from "./SeqExitSurvey1";
import SeqExitSurvey2 from "./SeqExitSurvey2";
import SeqExitSurvey3 from "./SeqExitSurvey3";


export default class SeqExitSurvey extends Sequence {

  constructor(props: any) {
    super(props);
    this.addSubsequence(SeqExitSurvey1);
    this.addSubsequence(SeqExitSurvey2);
    this.addSubsequence(SeqExitSurvey3);
  }

  onGoToNext() {
    this.props.data.post(false);
  }
}