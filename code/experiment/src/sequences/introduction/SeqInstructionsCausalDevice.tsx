import React from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Mode} from "../../components/graph/Edge";
import ButtonFooter from "../../components/ButtonFooter";


export default class SeqInstructionsCausalDevice extends Sequence {

  render() {
    const pRoot = 100 * this.props.data.experimentData.graphParams.pRoot;
    const pEdge = 100 * this.props.data.experimentData.graphParams.pEdge;
    const pNonRoot = 100 * this.props.data.experimentData.graphParams.pNonRoot;
    return (
      <div>
        <h1>Activations</h1>

        <p>
          If a component does not have any incoming causal connections,
          such as components B and C in the device below, they have
          a <b>{pRoot}%</b> chance to activate.
          <br/><br/>
          Causal connections have a <b>{pEdge}%</b> chance of working.
          This means that if B activates, there is a <b>{pEdge}%</b> chance that it will activate A.
          Components with an incoming arrow (such as A) also have a <b>{pNonRoot}%</b> chance to activate on their
          own. <b>Only active components can activate other components.
          Components do not prevent other components from activating.</b>
          <br/><br/>
          For example, in this device, components A and B are active.
          Because there is a causal arrow pointing from B to A,
          it is likely that B caused A to activate, though it is possible that A activated on its own.
          Since C is not active, even though there is a causal arrow pointing from C to A,
          it is impossible for it to have activated A.
          It is not possible for A to activate B or C, because the causal arrows point from B to A, and from C to A.
        </p>
        <br/>
        <CausalGraphThree
          width={250}
          radius={35}
          nodeA={true}
          nodeB={true}
          edgeAB={Mode.Backward}
          edgeAC={Mode.Backward}
        />
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}