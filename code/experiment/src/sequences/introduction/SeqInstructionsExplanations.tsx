import React from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Mode} from "../../components/graph/Edge";
import ButtonFooter from "../../components/ButtonFooter";
import ExplanationBubble from "../../components/ExplanationBubble";
import {Explanation} from "../../misc/Explanation";

export default class SeqInstructionsExplanations extends Sequence {

  render() {
    return (
      <div>
        <h1>Instructions 4</h1>

        <p>
          Some companies have access to a robot that knows how each component activated.
          The robot will give explanations of what happened.
          Its explanation can refer to either <b>two active components</b> or <b>two inactive components</b>.
          Explanations may refer to direct or indirect connections between components.
          <br/><br/>
          Everything that the robot says is guaranteed to be true, but the robot chooses its explanations at random.
          This means that while the robot will never be misleading, it may also not be the most helpful at times.
          <br/><br/>
          In the example below, there is a causal link from A to B, and from B to C.
          When the device was tested, A activated on its own, A activated B, and B activated C.
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
                edgeAB={Mode.Forward}
                edgeBC={Mode.Forward}
                edgeABActive={true}
                edgeBCActive={true}
              />
            </div>
          </div>
          <div className="col-8" style={{paddingLeft: 50}}>
            <ExplanationBubble
              explanation={new Explanation('A', 'B', true, true)}
              robotOnRight={false}/>

            <hr style={{ backgroundColor: 'black', height: 3, marginTop: 2, marginBottom: 12}} />
            <ExplanationBubble
              explanation={new Explanation('A', 'C', true, true)}
              robotOnRight={true}/>
            <p>
              Since A activated B and B activated C, A also indirectly activated C.
            </p>

            <hr style={{ backgroundColor: 'black', height: 3, marginTop: 2, marginBottom: 12}} />
            <ExplanationBubble
              explanation={new Explanation('C', 'A', true, false)}
              robotOnRight={false}/>
            <ExplanationBubble
              explanation={new Explanation('B', 'A', true, false)}
              robotOnRight={true}/>
            <p>
              Since there are no connections from C to A or from B to A, they cannot be the reasons why A activated.
            </p>
          </div>
        </div>
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}