import React, {ComponentProps} from "react";
import Image from "./Image";
import './ExplanationBubble.css';
import {Explanation} from "../misc/Explanation";

export default class ExplanationBubble extends React.Component<ComponentProps<any>> {
  props: {
    explanation: Explanation
    size?: number
    robotOnRight?: boolean
  }

  renderLeft() {
    const size = this.props.size === undefined ? 1 : this.props.size;
    return <div className="grid">
      <div className="col-2" style={{textAlign: 'left', width: size * 90}}>
        <div className="vertical-center">
          <Image filepath="img/robot.png" width={`${size*60}px`}/>
        </div>
      </div>
      <div className="col-9" style={{textAlign: 'left'}}>
          <span className="speech-bubble sb-left" style={{fontSize: size * 15}}>
            {this.props.explanation.stringify()}
          </span>
      </div>
    </div>
  }

  renderRight() {
    const size = this.props.size === undefined ? 1 : this.props.size;
    return <div className="grid">
      <div className="col-9" style={{textAlign: 'right'}}>
          <span className="speech-bubble sb-right" style={{fontSize: size * 15}}>
            {this.props.explanation.stringify()}
          </span>
      </div>
      <div className="col-2" style={{textAlign: 'right', width: size * 90}}>
        <div className="vertical-center">
          <Image filepath="img/robot.png" width={`${size*60}px`}/>
        </div>
      </div>
    </div>
  }

  render() {
    return <div className="explanation-bubble">
      { this.props.robotOnRight ? this.renderRight() : this.renderLeft() }
    </div>
  }
}