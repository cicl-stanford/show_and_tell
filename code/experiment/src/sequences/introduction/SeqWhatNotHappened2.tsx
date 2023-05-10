import Sequence from "../../misc/Sequence";
import {Mode} from "../../components/graph/Edge";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Explanation} from "../../misc/Explanation";
import React from "react";
import ExplanationBubble from "../../components/ExplanationBubble";
import ButtonFooter from "../../components/ButtonFooter";


export default class SeqWhatNotHappened2 extends Sequence {

  render(): JSX.Element {
    return <div>
      <h1>
        Example: Device Gly, Day 2
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
          <h3>What happened on Day 2</h3>
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
          <h3>What you see on Day 2</h3>
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
        The robot will also never say anything that is untrue.
        In this example, the robot would say that "C activated (but not) because" or
        "(but not) because C activated" because C did actually activate.
        Since B did not activate on this day, the robot would not say "B activated."
        <br/>
        <br/>
        Below are some examples of explanations that the robot would <b>not say</b> based on this principle.
        Check to see that each explanation below incorrectly refers to an inactive component as active.
      </p>
      <div className='grid' style={{padding: '2em'}}>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('A', 'B', true, true)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('A', 'C', true, true)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('A', 'C', true, false)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('B', 'C', true, false)}/>
        </div>
      </div>

      <br/>
      <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
    </div>
  }
}