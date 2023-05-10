import Sequence from "../../misc/Sequence";
import React, {createRef, RefObject} from "react";
import {InputNumber} from "primereact/inputnumber";
import SelectQuestion from "../../components/survey/SelectQuestion";
import {Toast} from "primereact/toast";
import {mapToObject} from "../../misc/utils";
import ButtonFooter from "../../components/ButtonFooter";
const _ = require('lodash');


const questions = [
  {
    key: 'gender',
    question: 'What is your gender?',
    options: ['Male', 'Female', 'Non-binary', 'Other'],
    multiSelect: false
  },
  {
    key: 'race',
    question: 'What is your race?',
    options: ['White', 'Black/African American', 'American Indian/Alaska Native', 'Asian',
      'Native Hawaiian/Pacific Islander', 'Multiracial', 'Other'],
    multiSelect: false
  },
  {
    key: 'ethnicity',
    question: 'What is your ethnicity?',
    options: ['Hispanic', 'Non-Hispanic'],
    multiSelect: false
  },
]

export default class SeqExitSurvey2 extends Sequence {

  refSelectQuestions: any;
  refToast: RefObject<Toast>;

  state: {[key: string]: any}

  constructor(props: any) {
    super(props);
    this.state = mapToObject(questions, (q) => [q.key, null]);
    this.state.age = null;
    this.refToast = createRef();
  }
  onSubmit() {
    if (_.filter(_.values(this.state), (e) => e === null).length > 0) {
      this.refToast.current!.show({severity: 'error',
                                    summary: 'Survey incomplete!',
                                    detail: 'Please respond to all questions',
                                    life: 5000
                                  });
    } else {
      _.forEach(this.state, (value: any, key: string) =>
        this.props.data.recordQuestionResponse(this, key, value));
      this.goToNext();
    }
  }

  render() {
    return (
      <div>
        <Toast ref={this.refToast} />
        <h1>Exit Survey (2/3)</h1>
        <div className="grid">
          <div className="col-3" style={{width: 275}}>
            <p>
              1. What is your age?
            </p>
          </div>
          <div className="col-6" style={{textAlign: 'justify'}}>
            <InputNumber value={this.state.age}
                         min={0}
                         max={100}
                         size={5}
                         onChange={(e) => this.setState({age: e.value})}/>
          </div>
        </div>
        {_.map(questions, (q: any, idx: number) => (
          <div key={`q-container-${q.key}`}>
            <hr style={{ backgroundColor: 'black', height: 3, marginTop: 4, marginBottom: 8}} />
            <SelectQuestion
              question={`${2+idx}. ${q.question}`}
              options={q.options}
              selected={this.state[q.key]}
              multiSelect={q.multiSelect}
              onChange={(v) => {
                const state = {};
                state[q.key] = v;
                this.setState(state)
              }}
              questionWidth={275}/>
          </div>
        ))}

        <div style={{textAlign: "right"}}>
          <ButtonFooter onNext={this.onSubmit.bind(this)}/>
        </div>
      </div>
    )
  }
}