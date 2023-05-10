import React, {ComponentProps} from "react";
import {Button} from "primereact/button";

export default class ButtonFooter extends React.Component<ComponentProps<any>> {
  props: {
    onNext?: () => void
    onBack?: () => void
  }

  render() {
    return <div className="flex justify-content-between flex-wrap">
      <div className="flex relative align-items-left justify-content-left">
        {this.props.onBack !== undefined &&
            <Button label="Back" onClick={this.props.onBack}/> }
      </div>
      <div className="flex relative align-items-right justify-content-right">
        {this.props.onNext !== undefined &&
            <Button label="Next" className="p-button-success" onClick={this.props.onNext}/> }
      </div>
    </div>
  }
}