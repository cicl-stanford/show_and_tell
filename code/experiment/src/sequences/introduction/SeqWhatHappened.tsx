import Sequence from "../../misc/Sequence";
import {Mode} from "../../components/graph/Edge";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Explanation, getAllExplanations} from "../../misc/Explanation";
import React from "react";
import ExplanationBubble from "../../components/ExplanationBubble";
import ButtonFooter from "../../components/ButtonFooter";
const _ = require('lodash');


export default class SeqWhatHappened extends Sequence {

  props: {
    deviceName: string,
    day: number
    description: string
    edgeAB?: Mode
    edgeAC?: Mode
    edgeBC?: Mode
    edgeABActive?: boolean
    edgeACActive?: boolean
    edgeBCActive?: boolean
    nodeA?: boolean
    nodeB?: boolean
    nodeC?: boolean
  }

  render(): JSX.Element {
    const explanations =_.filter(getAllExplanations(),
      (e: Explanation) => e.isValid(this.props.nodeA,
                                    this.props.nodeB,
                                    this.props.nodeC,
                                    this.props.edgeABActive ? this.props.edgeAB : Mode.None,
                                    this.props.edgeACActive ? this.props.edgeAC : Mode.None,
                                    this.props.edgeBCActive ? this.props.edgeBC : Mode.None));

    return <div>
      <h1>
        Example: Device {this.props.deviceName}, Day {this.props.day}
      </h1>
      <br/>
      <div className="grid">
        <div className="col-4">
          <h3>Actual device</h3>
          <br/>
          <CausalGraphThree
            width={220}
            radius={32}
            edgeAB={this.props.edgeAB}
            edgeAC={this.props.edgeAC}
            edgeBC={this.props.edgeBC}
          />
        </div>
        <div className="col-4">
          <h3>What happened on Day {this.props.day}</h3>
          <br/>
          <CausalGraphThree
            width={220}
            radius={32}
            nodeA={this.props.nodeA}
            nodeB={this.props.nodeB}
            nodeC={this.props.nodeC}
            edgeAB={this.props.edgeAB}
            edgeAC={this.props.edgeAC}
            edgeBC={this.props.edgeBC}
            edgeABActive={this.props.edgeABActive}
            edgeACActive={this.props.edgeACActive}
            edgeBCActive={this.props.edgeBCActive}
          />
        </div>
        <div className="col-4">
          <h3>What you see on Day {this.props.day}</h3>
          <br/>
          <CausalGraphThree
            width={220}
            radius={32}
            nodeA={this.props.nodeA}
            nodeB={this.props.nodeB}
            nodeC={this.props.nodeC}/>
        </div>
      </div>
      <br/>

      <p>
        {this.props.description}
      </p>

      <br/>
      <p>
        Here are all the possible explanations that the robot may give
        for what happened on Day {this.props.day} (you would only receive one of these):
      </p>
      <br/>
      <div className='grid'>
        {
          _.map(explanations, (e: Explanation, idx: number) => {
            return <div className='col-6' key={`exp${idx}`} style={{paddingLeft: '10px', paddingRight: '10px'}}>
              <ExplanationBubble explanation={e} robotOnRight={false}/>
            </div>
          })
        }
      </div>

      <br/>
      <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
    </div>
  }
}