/**
 * This component is only for generating figures to include in papers, presentations, etc.
 * It is not meant to be included in the actual experiment.
 */


import React from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Mode} from "../../components/graph/Edge";


export default class SeqExamples extends Sequence {

  render() {
    return (
      <div>
        Separate
        <div id="separate">
          <CausalGraphThree
            width={220}
            radius={32}
            // nodeA={true}
            // nodeB={true}
            // nodeC={true}
          />
        </div>

        Pair
        <div id="pair">
          <CausalGraphThree
            width={220}
            radius={32}
            // nodeA={true}
            // nodeB={true}
            // nodeC={true}
            edgeAB={Mode.Forward}
          />
        </div>

        Line
        <div id="line">
          <CausalGraphThree
            width={220}
            radius={32}
            // nodeA={true}
            // nodeB={true}
            // nodeC={true}
            edgeAB={Mode.Forward}
            edgeBC={Mode.Forward}
          />
        </div>

        Common cause
        <div id="common-cause">
          <CausalGraphThree
            width={220}
            radius={32}
            // nodeA={true}
            // nodeB={true}
            // nodeC={true}
            edgeAB={Mode.Forward}
            edgeAC={Mode.Forward}
          />
        </div>

        Common effect
        <div id="common-effect">
          <CausalGraphThree
            width={220}
            radius={32}
            // nodeA={true}
            // nodeB={true}
            // nodeC={true}
            edgeAC={Mode.Forward}
            edgeBC={Mode.Forward}
          />
        </div>

        Skip
        <div id="skip">
          <CausalGraphThree
            width={220}
            radius={32}
            // nodeA={true}
            // nodeB={true}
            // nodeC={true}
            edgeAB={Mode.Forward}
            edgeAC={Mode.Forward}
            edgeBC={Mode.Forward}
          />
        </div>

        <div id="common-effect-active">
          <CausalGraphThree
            width={220}
            radius={32}
            nodeA={true}
            nodeB={true}
            nodeC={true}
            edgeAB={Mode.Backward}
            edgeBC={Mode.Backward}
            edgeAC={Mode.Backward}
            edgeABActive={true}
            edgeACActive={true}
            edgeBCActive={false}
          />
        </div>

        <div id="common-effect-inactive">
          <CausalGraphThree
            width={220}
            radius={32}
            edgeAB={Mode.Backward}
            edgeAC={Mode.Backward}
            edgeBC={Mode.Backward}
            edgeABActive={true}
            edgeACActive={true}
            edgeBCActive={false}
          />
        </div>

        <div id="line-active">
          <CausalGraphThree
            width={220}
            radius={32}
            nodeA={true}
            nodeB={true}
            nodeC={true}
            edgeAB={Mode.Forward}
            edgeBC={Mode.Forward}
            edgeABActive={true}
            edgeBCActive={true}
          />
        </div>

        <div id="line-inactive">
          <CausalGraphThree
            width={220}
            radius={32}
            edgeAB={Mode.Forward}
            edgeBC={Mode.Forward}
            edgeABActive={true}
            edgeBCActive={true}
          />
        </div>

        <div id="self-activation">
          <CausalGraphThree
            width={220}
            radius={32}
            nodeB={true}
            nodeC={true}
            edgeAC={Mode.Forward}
            edgeBC={Mode.Forward}
          />
        </div>
      </div>
    );
  }
}