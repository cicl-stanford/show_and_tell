import React, {createRef, RefObject} from 'react';
import Sequence from "../../misc/Sequence";
import SelectQuestion from "../../components/survey/SelectQuestion";
import {Toast} from "primereact/toast";
import ButtonFooter from "../../components/ButtonFooter";
const _ = require('lodash');

const questions = [
  {
    key: "education",
    question: "What is your highest level of education, including currently pursuing?",
    options: [
      "Have not graduated high school",
      "High school graduate or equivalent",
      "Associate's degree",
      "Bachelor's degree",
      "Master's degree",
      "Doctoral degree",
    ],
    multiSelect: false
  },
  {
    key: "math",
    question: "Which of the following topics have you taken a course in? Select all that apply.",
    options: [
      "Middle/high school algebra",
      "Middle/high school geometry",
      "Trigonometric functions",
      "Single-variable calculus",
      "Multi-variable calculus",
      "Linear algebra",
      "Probability & statistics",
      "Discrete mathematics",
      "Formal logic",
      "Computer science or programming",
    ],
    multiSelect: true
  }
]

export default class SeqExitSurvey3 extends Sequence {

  refSelectQuestions: any;
  refToast: RefObject<Toast>;

  state: {[key: string]: any}

  constructor(props: any) {
    super(props);
    this.state = {
      education: null,
      math: []
    }
    this.refToast = createRef();
  }

  onSubmit() {
    if (this.state.education == null) {
      this.refToast.current!.show({severity: 'error',
        summary: 'Survey incomplete!',
        detail: 'Please indicate your highest level of education.',
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
        <h1>Exit Survey (3/3)</h1>

        {_.map(questions, (q: any, idx: number) => (
          <div key={`q-container-${q.key}`}>
            { idx > 0 && <hr style={{ backgroundColor: 'black', height: 3, marginTop: 4, marginBottom: 8}} /> }
            <SelectQuestion
              question={`${1+idx}. ${q.question}`}
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