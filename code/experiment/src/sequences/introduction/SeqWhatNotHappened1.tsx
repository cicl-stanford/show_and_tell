import Sequence from "../../misc/Sequence";
import {Mode} from "../../components/graph/Edge";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Explanation} from "../../misc/Explanation";
import React from "react";
import ExplanationBubble from "../../components/ExplanationBubble";
import ButtonFooter from "../../components/ButtonFooter";


export default class SeqWhatNotHappened1 extends Sequence {

  render(): JSX.Element {
    return <div>
      <h1>
        Example: Device Gly, Day 1
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
          <h3>What happened on Day 1</h3>
          <br/>
          <CausalGraphThree
            width={220}
            radius={32}
            nodeA={true}
            nodeB={false}
            nodeC={true}
            edgeAB={Mode.Forward}
            edgeAC={Mode.Forward}
            edgeABActive={false}
            edgeACActive={true}
          />
        </div>
        <div className="col-4">
          <h3>What you see on Day 1</h3>
          <br/>
          <CausalGraphThree
            width={220}
            radius={32}
            nodeA={true}
            nodeB={false}
            nodeC={true}/>
        </div>
      </div>
      <br/>

      <p>
        Note that the robot will <b>never</b> give an explanation about one active and one inactive components
        because they wouldn't make sense in the context of what happened.
        <br/><br/>
        Below are some examples of explanations that the robot would <b>not say</b> based on this principle.
        Check to see that each explanation below refers to one active and one inactive components.
      </p>
      <br/>
      <div className='grid'>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('A', 'B', false, true)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('B', 'A', true, false)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('B', 'C', false, true)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('C', 'B', false, false)}/>
        </div>
      </div>

      <br/>
      <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
    </div>
  }
}