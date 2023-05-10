import {ExperimentData} from "./serviceLayer";
import {Mode} from "../components/graph/Edge";
import {httpPost, now, sleep} from "./utils";
import Sequence from "./Sequence";
import {CONFIG} from "../config";

const _ = require('lodash');


export interface SessionParams {
  prolificPid: string
  studyId: string
  sessionId: string
}

export interface TrialResponse {
  setIndex: number
  obsIndex: number
  edgeAB: Mode
  edgeAC: Mode
  edgeBC: Mode
  responseTime: number
}

export class Data {

  startTime: string
  sessionParams: any;
  experimentData: ExperimentData;
  trialResponses: TrialResponse[];
  questionResponses: any;
  sequenceTimestamps: {timestamp: string, sequence: any}[];
  sequenceStates: {[key: string]: any};

  constructor(sessionParams: SessionParams, experimentData: ExperimentData) {
    this.startTime = now();
    this.sessionParams = sessionParams;
    this.experimentData = experimentData;
    this.trialResponses = [];
    this.questionResponses = {};
    this.sequenceStates = {};
    this.sequenceTimestamps = [];

    // Call post() every interval.
    setInterval(function() { this.post(false); }.bind(this), CONFIG.post_data_interval);
  }

  /**
   * Posts the current Data snapshot to the server.
   * wait: whether or not to stall the program until a positive response is received
   *       If false, proceeds asynchronously
   */
  async post(wait: boolean) {
    const filename = `${this.sessionParams.prolificPid}.json`;
    await httpPost(filename, this, wait);
  }

  saveSequenceState(sequence: Sequence) {
    const key = sequence.getSequenceKey();
    this.sequenceStates[key] = sequence.createStateData();
  }

  loadSequenceState(sequence: Sequence) {
    const key = sequence.getSequenceKey();
    return key in this.sequenceStates ? this.sequenceStates[key] : null;
  }

  recordQuestionResponse(sequence: Sequence, key: string, value: any) {
    const seq_params = sequence.getParams();
    const seq_key = sequence.getSequenceKey();
    if (!(seq_key in this.questionResponses)) {
      this.questionResponses[seq_key] = {_sequence: seq_params};
    }
    if (!(key in this.questionResponses[seq_key])) {
      this.questionResponses[seq_key][key] = [];
    }
    this.questionResponses[seq_key][key].push({_timestamp: now(), response: value});
  }

  /**
   * Returns a matrix of shape [numSets, numTrials] indicating the number of correctly identified edges at edge trial.
   * The last array may be short if the current set is incomplete.
   */
  getNumEdgesSolved() {
    let solved = [];
    let seqSolved = [];
    let lastSetIndex = 0;
    for (let response of this.trialResponses) {
      if (response.setIndex !== lastSetIndex) {
        solved.push(seqSolved);
        seqSolved = [];
      }

      let trialSet = this.experimentData.trialSets[response.setIndex];
      let edgeAB = Number(trialSet.edgeAB === response.edgeAB);
      let edgeAC = Number(trialSet.edgeAC === response.edgeAC);
      let edgeBC = Number(trialSet.edgeBC === response.edgeBC);
      let numSolved = edgeAB + edgeAC + edgeBC;
      seqSolved.push(numSolved);
      lastSetIndex = response.setIndex;
    }
    solved.push(seqSolved);
    return solved;
  }

  /**
   * Returns the cumulative sum of all correctly identified edges across all sets.
   */
  getTotalEdgesSolved() {
    const numSolved = this.getNumEdgesSolved();
    return _.sum(_.map(numSolved, (a: any) => _.sum(a) ));
  }
}