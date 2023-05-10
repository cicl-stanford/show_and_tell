import React from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Mode} from "../../components/graph/Edge";
import ButtonFooter from "../../components/ButtonFooter";
import ExplanationBubble from "../../components/ExplanationBubble";
import {Explanation} from "../../misc/Explanation";

export default class SeqInstructionsExplanationsInactive extends Sequence {

  render() {
    return (
      <div>
        <h1>Instructions 6</h1>

        <p>
          The robot can also give explanations about inactive components.
          <br/><br/>
          Recall that everything that the robot says is guaranteed to be true, but the robot chooses its explanations at random.
          <br/><br/>
          In the first example, there is a causal link from A to B, and a causal link from B to C.
          Neither, A, B, nor C activated on their own. Here are some possible explanations the robot might give based on what happened and their interpretations
        </p>
        <br/>
        <div className="grid">
          <div className="col-4">
            <div className='vertical-center'>
              <CausalGraphThree
                width={250}
                radius={35}
                nodeA={false}
                nodeB={false}
                nodeC={false}
                edgeAB={Mode.Forward}
                edgeBC={Mode.Forward}
                edgeABActive={true}
                edgeBCActive={true}
              />
            </div>
          </div>
          <div className="col-8" style={{paddingLeft: 50}}>
            <ExplanationBubble
              explanation={new Explanation('A', 'B', false, true)}
              robotOnRight={false}/>
              <hr style={{ backgroundColor: 'black', height: 3, marginTop: 2, marginBottom: 12}} />
            <ExplanationBubble
              explanation={new Explanation('A', 'C', false, true)}
              robotOnRight={true}/>
            <p>
              Since the connection from A to B and the connection from B to C were working, A would have activated B, and A would have activated C.
            </p>

            <hr style={{ backgroundColor: 'black', height: 3, marginTop: 2, marginBottom: 12}} />
            <ExplanationBubble
              explanation={new Explanation('C', 'A', false, false)}
              robotOnRight={false}/>
            <ExplanationBubble
              explanation={new Explanation('B', 'A', false, false)}
              robotOnRight={true}/>
            <p>
              Since there are no connections from C to A or from B to A, they wouldn't have activated A.
            </p>
          </div>
        </div>
        <br/>
        <p>
          In the second example, there is a causal link from B to A, and a causal link from C to A.
          Neither, A, B, nor C activated on their own. Here are some possible explanations the robot might give based on what happened and their interpretations.
        </p>
        <br/>
        <div className="grid">
          <div className="col-4">
            <div className='vertical-center'>
              <CausalGraphThree
                  width={250}
                  radius={35}
                  nodeA={false}
                  nodeB={false}
                  nodeC={false}
                  edgeAB={Mode.Backward}
                  edgeAC={Mode.Backward}
                  edgeABActive={true}
                  edgeACActive={true}
              />
            </div>
          </div>
          <div className="col-8" style={{paddingLeft: 50}}>
            <ExplanationBubble
                explanation={new Explanation('B', 'A', false, true)}
                robotOnRight={false}/>

            <ExplanationBubble
                explanation={new Explanation('C', 'A', false, true)}
                robotOnRight={true}/>
            <p>
              There are working connections from B to A, and from C to A, so both explanations are valid.
            </p>


          </div>
        </div>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}