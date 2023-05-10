import React from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Mode} from "../../components/graph/Edge";
import ButtonFooter from "../../components/ButtonFooter";
import ExplanationBubble from "../../components/ExplanationBubble";
import {Explanation} from "../../misc/Explanation";

export default class SeqInstructionsExplanationsDouble extends Sequence {

  render() {
    return (
      <div>
        <h1>Instructions 5</h1>

        <p>
          In this example, there is a causal link from A to C, and from B to C.
          When the device was tested, A and B activated on their own. A activated C, and B also activated C.
          Here are some possible explanations that the robot might give based on what happened
          and their interpretations:
        </p>
        <br/>
        <div className="grid">
          <div className="col-4">
            <div className='vertical-center'>
              <CausalGraphThree
                width={250}
                radius={35}
                nodeA={true}
                nodeB={true}
                nodeC={true}
                edgeAC={Mode.Forward}
                edgeBC={Mode.Forward}
                edgeACActive={true}
                edgeBCActive={true}
              />
            </div>
          </div>
          <div className="col-8" style={{paddingLeft: 50}}>
            <ExplanationBubble
              explanation={new Explanation('A', 'C', true, true)}
              robotOnRight={false}/>

            <ExplanationBubble
              explanation={new Explanation('B', 'C', true, true)}
              robotOnRight={true}/>
            <p>
              Here, A caused C to activate, and B caused C to activate, so both statements are true.
            </p>

            <hr style={{ backgroundColor: 'black', height: 3, marginTop: 2, marginBottom: 12}} />
            <ExplanationBubble
              explanation={new Explanation('C', 'A', true, false)}
              robotOnRight={false}/>
            <ExplanationBubble
              explanation={new Explanation('C', 'B', true, false)}
              robotOnRight={true}/>
            <p>
              Since there are no connections from C to A or from C to B, C cannot be the reason that A or B activated.
            </p>
          </div>
        </div>
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}