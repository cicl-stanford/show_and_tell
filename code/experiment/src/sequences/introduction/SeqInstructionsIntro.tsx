import React from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import { Mode } from '../../components/graph/Edge';
import ButtonFooter from "../../components/ButtonFooter";


export default class SeqInstructionsIntro extends Sequence {



  render() {
    return (
      <div>
        <h1>Causal Devices</h1>

        <p>
          In this study, you will be taking the role of a scientist trying to figure out how
          certain <b>causal devices</b> work.

          Each device contains 3 <b>components</b>, indicated by circles with letters inside of them,
          and <b>causal connections</b>, indicated by arrows.
        </p>
        <br/>
        <CausalGraphThree
          width={250}
          radius={35}
          nodeA={false}
          nodeB={true}
          nodeC={true}
          edgeBC={Mode.Backward}
        />
        <br/>
        <br/>
        <p>
          Components may be <b>active</b> (yellow) or <b>inactive</b> (gray).
          Some of the components are connected, while others are not.
          In this device, there is a causal connection from C to B, indicated by the arrow pointing from C to B.
          This means that when C is active, it may cause B to activate.
          There are no causal connections between A and B, or between A and C.
        </p>
        <br/>
        <ButtonFooter onNext={this.goToNext}/>
      </div>
    );
  }
}