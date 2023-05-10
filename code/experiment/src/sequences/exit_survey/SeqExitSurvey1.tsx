import Sequence from "../../misc/Sequence";
import React from "react";
import { InputTextarea } from 'primereact/inputtextarea';
import {Button} from "primereact/button";


export default class SeqExitSurvey1 extends Sequence {

  state: {
    general: string,
  }

  constructor(props: any) {
    super(props);
    this.state = {
      general: ""
    }
  }

  onSubmit() {
    this.props.data.recordQuestionResponse(this, 'general', this.state.general);
    this.goToNext();
  }

  render() {
    return (
      <div>
        <h1>Exit Survey (1/3)</h1>
        <p>
          Please answer the following questions to complete the experiment.
          <br/><br/>
          What factors influenced how you decided to respond?
          Do you have any questions or comments regarding the experiment?
          <br/><br/>
        </p>
        <InputTextarea
          rows={8}
          cols={78}
          value={this.state.general}
          onChange={(e) => this.setState({general: e.target.value})} />

        <div style={{paddingTop: 25, textAlign: 'right'}}>
          <Button className="p-button-success" label="Next" icon="pi pi-arrow-right" iconPos="right"
                  onClick={this.goToNext.bind(this)}/>
        </div>
      </div>
    )
  }
}