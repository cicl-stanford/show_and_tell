import Sequence from "../../misc/Sequence";
import {Mode} from "../../components/graph/Edge";
import CausalGraphThree from "../../components/CausalGraphThree";
import React, {createRef, RefObject} from "react";
import {InputNumber} from "primereact/inputnumber";
import {Toast} from "primereact/toast";
import {mapToObject} from "../../misc/utils";
import ButtonFooter from "../../components/ButtonFooter";
const _ = require('lodash');

function createQuestions(pRoot: number, pNonRoot: number, pEdge: number) {
  return  [
    {
      key: 'p_a',
      question: 'What is the chance that A will activate?',
      solution: 100 * pRoot
    },
    {
      key: 'p_b_given_a',
      question: 'If A activates, what is the chance that it will cause B to activate?',
      solution: 100 * pEdge
    },
    {
      key: 'p_b_given_not_a',
      question: 'If A does not activate, what is the chance that B will activate on its own?',
      solution: 100 * pNonRoot
    },
    {
      key: 'p_c_given_b',
      question: 'If B activates, what is the chance that C will activate?',
      solution: 100 * pRoot
    },
    {
      key: 'p_c_given_not_b',
      question: 'If B does not activate, what is the chance that C will activate?',
      solution: 100 * pRoot
    }
  ]
}

export default class SeqComprehensionCheck1 extends Sequence {

  refToast: RefObject<Toast>;
  state: {[key: number]: null | number};
  questions: any[];

  constructor(props: any) {
    super(props);
    this.questions = createQuestions(this.props.data.experimentData.graphParams.pRoot,
      this.props.data.experimentData.graphParams.pNonRoot,
      this.props.data.experimentData.graphParams.pEdge)
    this.state = mapToObject(this.questions, (q) => [q.key, null]);
    this.refToast = createRef();
  }

  create_prob_question(qText: string, stateKey: string) {
    return <div className="flex justify-content-around flex-wrap"
                key={stateKey}
                style={{paddingTop: 4, paddingLeft: 8}}>
      <div className="flex relative align-items-center justify-content-left"
           style={{width: 320, textAlign: "left"}}>
        {qText}
      </div>

      <div className="flex relative align-items-center justify-content-left" style={{paddingLeft: 8}}>
        <InputNumber value={this.state[stateKey]}
                     min={0}
                     max={100}
                     size={4}
                     suffix='%'
                     style={{height: 28}}
                     onChange={(e) => {
                       const state: any = {};
                       state[stateKey] = e.value;
                       this.setState(state)}
                     }/>
      </div>
    </div>
  }

  onSubmit() {
    _.forEach(this.state, (value: any, key: string) =>
      this.props.data.recordQuestionResponse(this, key, value));
    const solutions = mapToObject(this.questions, (q) => [q.key, q.solution]);
    if (!_.isEqual(this.state, solutions)) {
      this.refToast.current!.show({severity: 'error',
        summary: 'Incorrect',
        detail: `One or more of your responses are incorrect. 
        Please check the instructions again and correct your responses.`,
        life: 5000
      });
    } else {
      this.goToNext();
    }
  }

  onKeyDown = function (key: string) {
    if (key == 'Enter') {
      this.onSubmit();
    }
  }

  render(): JSX.Element {
    return <div>
      <Toast ref={this.refToast} />
      <h1>Comprehension Check</h1>
      <p>
        Please answer the following questions about the model below:
      </p>
      <br/>
      <div className="grid">
        <div className="col-4">
          <div className="vertical-center ">
            <CausalGraphThree
              width={230}
              radius={35}
              edgeAB={Mode.Forward}
            />
          </div>
        </div>
        <div className="col-8">
          {_.map(this.questions,
            (q: any, idx: number) => this.create_prob_question(`${idx+1}. ${q.question}`, q.key))}
        </div>
      </div>
      <br/>

      <ButtonFooter onBack={this.goToPrev.bind(this)} onNext={this.onSubmit.bind(this)}/>
    </div>
  }
}