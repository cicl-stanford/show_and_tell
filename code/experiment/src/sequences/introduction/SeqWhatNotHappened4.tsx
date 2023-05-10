import Sequence from "../../misc/Sequence";
import {Mode} from "../../components/graph/Edge";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Explanation} from "../../misc/Explanation";
import React from "react";
import ExplanationBubble from "../../components/ExplanationBubble";
import ButtonFooter from "../../components/ButtonFooter";


export default class SeqWhatNotHappened4 extends Sequence {

  render(): JSX.Element {
    return <div>
      <h1>
        Example: Device Gly, Day 4
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
            nodeC={false}
            edgeAB={Mode.Forward}
            edgeAC={Mode.Forward}
            edgeABActive={false}
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
            nodeC={false}/>
        </div>
      </div>
      <br/>

      <p>
        Lastly, the robot never will incorrectly refer to connections.
        In this example, the robot would <b>not</b> say that "B would have activated if A had activated"
        since the connection from A to B did not work on this day.
        <br/>
        <br/>
        Below are some examples of explanations that the robot would <b>not say</b> based on this principle.
        Check to see that each explanation below incorrectly refers to a working connection as if it wasn't,
        or to a connection that isn't working as if it was.
      </p>
      <div className='grid' style={{padding: '2em'}}>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('A', 'B', false, true)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('B', 'A', false, true)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('A', 'C', false, false)}/>
        </div>
        <div className='col-6'>
          <ExplanationBubble explanation={new Explanation('B', 'C', false, true)}/>
        </div>
      </div>

      <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
    </div>
  }
}