import React from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Mode} from "../../components/graph/Edge";
import ButtonFooter from "../../components/ButtonFooter";


export default class SeqInstructionsNoCycles extends Sequence {

  render() {
    return (
      <div>
        <h1>Invalid Models</h1>

        <p>
          No model will ever have a cycle, such as the two models shown below.
          <br/>
          <br/>
          <b>These two models are invalid and will never occur, so make sure never to guess these.</b>
        </p>
        <br/>
        <span style={{paddingRight: '50px'}}>
          <CausalGraphThree
            width={250}
            radius={35}
            edgeAB={Mode.Forward}
            edgeBC={Mode.Forward}
            edgeAC={Mode.Backward}
          />
        </span>
        <span style={{paddingLeft: '50px'}}>
          <CausalGraphThree
            width={250}
            radius={35}
            edgeAB={Mode.Backward}
            edgeBC={Mode.Backward}
            edgeAC={Mode.Forward}
          />
        </span>
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}