import {httpGet, loadJSON, randomWords, timeFormat} from "./utils";
import {CONFIG, Config, getFlaskURL, getPostURL} from "../config";
import {sleep} from "./utils"
import {Mode} from "../components/graph/Edge";
import moment from "moment";
import {Explanation} from "./Explanation";
const _ = require('lodash');

const graphNames = _.shuffle(randomWords);

export interface ExperimentData {
  conditions: {
    showActivations: boolean,
    showExplanations: boolean
  }
  graphParams: {
    pRoot: number,
    pNonRoot: number,
    pEdge: number
  }
  tutorial: TrialSet
  trialSets: TrialSet[]
}

export interface TrialSet {
  setIndex: number
  graphType: string
  graphName: string
  edgeAB: Mode
  edgeAC: Mode
  edgeBC: Mode
  observations: Observation[]
}

export interface Observation {
  obsIdx: number
  activations: {[key: string]: boolean}
  detachments: string[]
  explanation: Explanation
}

function loadTrialSet(rawTrials: any, trialIdx: number) {
  let edgeAB = Mode.None;
  let edgeAC = Mode.None;
  let edgeBC = Mode.None;
  for (let edge of rawTrials.edges) {
    if (edge[0] === 'A' && edge[1] === 'B') {
      edgeAB = Mode.Forward;
    } else if (edge[0] === 'B' && edge[1] === 'A') {
      edgeAB = Mode.Backward;
    } else if (edge[0] === 'A' && edge[1] === 'C') {
      edgeAC = Mode.Forward;
    } else if (edge[0] === 'C' && edge[1] === 'A') {
      edgeAC = Mode.Backward;
    } else if (edge[0] === 'B' && edge[1] === 'C') {
      edgeBC = Mode.Forward;
    } else if (edge[0] === 'C' && edge[1] === 'B') {
      edgeBC = Mode.Backward;
    }
  }

  let observations = _.map(rawTrials.observations, (obs: any, idx: number) => {
    obs.obsIdx = idx;
    obs.explanation = new Explanation(obs.explanation.node1,
                                      obs.explanation.node2,
                                      obs.explanation.nodes_active,
                                      obs.explanation.cause);
    return obs;
  });
  return {
    setIndex: trialIdx,
    graphType: rawTrials.graph_type,
    graphName: graphNames[trialIdx],
    edgeAB: edgeAB,
    edgeAC: edgeAC,
    edgeBC: edgeBC,
    observations: observations
  }}

/**
 * Loads all the information needed to run the experiment, such as stimuli data.
 */
export async function getNewExperimentData(prolificPid: string): Promise<ExperimentData> {
  const data: any = await httpGet(`${getFlaskURL()}?seed=${prolificPid}`);

  const trialSets: TrialSet[] = _.map(_.shuffle(data.trials), loadTrialSet);
  const tutorial: TrialSet = loadTrialSet(data.tutorial, 0);
  const graphParams = {
    pRoot: data.graph_params.p_root,
    pNonRoot: data.graph_params.p_nonroot,
    pEdge: data.graph_params.p_edge
  };
  return {
    conditions: data.conditions,
    graphParams: graphParams,
    tutorial: tutorial,
    trialSets: trialSets
  }
}