import Sequence from "../../misc/Sequence";
import {Mode} from "../../components/graph/Edge";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Explanation} from "../../misc/Explanation";
import React from "react";
import ExplanationBubble from "../../components/ExplanationBubble";
import ButtonFooter from "../../components/ButtonFooter";


export default class SeqWhatNotHappened3 extends Sequence {

  render(): JSX.Element {
    return <div>
      <h1>
        Example: Device Gly, Day 3
      </h1>
      <br/>
      <div className="grid">
        <div className="col-4">
          <h3>Actual device</h3>
          <br/>
          <CausalGraphThree
            width={220}
            radius={32}
            edgeAB={Mode.Forward}
            edgeAC={Mode.Forward}
          />
        </div>
        <div className="col-4">
          <h3>What happened on Day 3</h3>
          <br/>
          <CausalGraphThree
            width={220}
            radius={32}
            nodeA={false}
            nodeB={false}
            nodeC={true}
            edgeAB={Mode.Forward}
            edgeAC={Mode.Forward}
            edgeABActive={true}
            edgeACActive={true}
          />
        </div>
        <div className="col-4">
          <h3>What you see on Day 3</h3>
          <br/>
          <CausalGraphThree
            width={220}
            radius={32}
            nodeA={false}
            nodeB={false}
            nodeC={true}/>
        </div>
      </div>
      <br/>

      <p>
        Sometimes, the robot will refer to activations that <b>would have happened</b> had another component been active,
        indicating that <b>both components are inactive</b>.
        In this example, the robot would say that "A would (not) have activated if..." or
        "(even) if A had activated" because A did not actually activate.
        Since C did activate, the robot would not say "C would have activated" or "if C had activated".
        <br/>
        <br/>
        Below are some examples of explanations that the robot would <b>not say</b> based on this principle.
        Check to see that each explanation below incorrectly refers to an active component as inactive.
      </p>
      <div className='grid' style={{padding: '2em'}}>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('A', 'C', false, true)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('C', 'B', false, false)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('C', 'A', false, false)}/>
        </div>
      </div>

      <br/>
      <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
    </div>
  }
}