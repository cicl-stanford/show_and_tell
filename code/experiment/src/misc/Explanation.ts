import {Mode} from "../components/graph/Edge";
const _ = require('lodash');

export function getAllExplanations() {
  /**
   * Returns a list of all possible explanations
   */
  let explanations = [];
  for (let node1 of ['A', 'B', 'C']) {
    for (let node2 of ['A', 'B', 'C']) {
      if (node1 != node2) {
        for (let nodes_active of [true, false]) {
          for (let cause of [true, false]) {
            explanations.push(new Explanation(node1, node2, nodes_active, cause));
          }
        }
      }
    }
  }
  explanations = _.sortBy(explanations, [(e: Explanation) => e.stringify()]);
  return explanations
}

export class Explanation {

  node1: string
  node2: string
  nodes_active: boolean
  cause: boolean

  constructor(node1, node2, nodes_active, cause) {
    this.node1 = node1
    this.node2 = node2
    this.nodes_active = nodes_active
    this.cause = cause
  }

  /**
   * Checks whether the explanation is valid based on the node and edge modes.
   * Returns true if node2 is a descendant of node1, either directly or indirectly.
   * @param nodeA
   * @param nodeB
   * @param nodeC
   * @param edgeAB
   * @param edgeAC
   * @param edgeBC
   */
  isValid(nodeA?: boolean, nodeB?: boolean, nodeC?: boolean, edgeAB?: Mode, edgeAC?: Mode, edgeBC?: Mode) {
    nodeA = !!nodeA;
    nodeB = !!nodeB;
    nodeC = !!nodeC;
    edgeAB = edgeAB === undefined ? Mode.None : edgeAB;
    edgeAC = edgeAC === undefined ? Mode.None : edgeAC;
    edgeBC = edgeBC === undefined ? Mode.None : edgeBC;

    if (this.nodes_active && !(eval(`node${this.node1} && node${this.node2}`))) {
      return false;
    }
    if (!this.nodes_active && (eval(`node${this.node1} || node${this.node2}`))) {
      return false;
    }

    let directMode;
    let indirectMode;
    if ((this.node1 == 'A' && this.node2 == 'B') || (this.node1 == 'B' && this.node2 == 'A')) {
      directMode = edgeAB;
      if (edgeAC == Mode.Forward && edgeBC == Mode.Backward) {
        indirectMode = Mode.Forward;
      } else if (edgeBC == Mode.Forward && edgeAC == Mode.Backward) {
        indirectMode = Mode.Backward;
      } else {
        indirectMode = Mode.None;
      }
    } else if ((this.node1 == 'A' && this.node2 == 'C') || (this.node1 == 'C' && this.node2 == 'A')) {
      directMode = edgeAC;
      indirectMode = edgeAB == edgeBC ? edgeAB : Mode.None;
    } else {
      directMode = edgeBC;
      indirectMode = edgeAB == edgeAC ? edgeAB : Mode.None;
    }

    if (this.cause) {
      if (directMode == (this.node1 < this.node2 ? Mode.Forward : Mode.Backward)) {
        return true;
      }
      if (indirectMode == (this.node1 < this.node2 ? Mode.Forward : Mode.Backward)) {
        return true;
      }
      return false;
    } else {
      if (directMode == (this.node1 < this.node2 ? Mode.Forward : Mode.Backward)) {
        return false;
      }
      if (indirectMode == (this.node1 < this.node2 ? Mode.Forward : Mode.Backward)) {
        return false;
      }
      return true;
    }
  }

  stringify() {
    if (this.nodes_active && this.cause) {
      return `${this.node2} activated because ${this.node1} activated`;
    }
    if (this.nodes_active && !this.cause) {
      return `${this.node2} activated, but not because ${this.node1} activated`;
    }
    if (!this.nodes_active && this.cause) {
      return `${this.node2} would have activated if ${this.node1} had activated`;
    }
    return `${this.node2} would not have activated, even if ${this.node1} had activated`;
  }
}