import Sequence from "../../misc/Sequence";
import {Mode} from "../../components/graph/Edge";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Explanation, getAllExplanations} from "../../misc/Explanation";
import React, {createRef, RefObject} from "react";
import ExplanationBubble from "../../components/ExplanationBubble";
import ButtonFooter from "../../components/ButtonFooter";
import {Toast} from "primereact/toast";
import {mapToObject} from "../../misc/utils";
import {Data} from "../../misc/Data";
import SelectQuestion from "../../components/survey/SelectQuestion";
const _ = require('lodash');


export default class SeqCompCheckExplanations extends Sequence {

    props: {
        data: Data
        nodeA?: boolean
        nodeB?: boolean
        nodeC?: boolean
        edgeAB?: Mode
        edgeAC?: Mode
        edgeBC?: Mode
        edgeABActive?: boolean
        edgeACActive?: boolean
        edgeBCActive?: boolean
        explanations: string[]
        solutions: boolean[]
    }

    refToast: RefObject<Toast>;
    state: {[key: string]: null | string}

    constructor(props: any) {
        super(props);
        this.state = mapToObject(props.explanations, (e: string) => [e, null]);
        this.refToast = createRef();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        _.forEach(this.state, (value: any, key: string) =>
            this.props.data.recordQuestionResponse(this, key, value));
        const solutions = mapToObject(_.zip(this.props.explanations, this.props.solutions),
            (a) => [a[0], a[1] ? 'True': 'False']);
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

    render(): JSX.Element {
        return <div>
            <Toast ref={this.refToast} />
            <h1>
                Comprehension Check
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
                    <h3>What happened</h3>
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
                    <h3>What you see</h3>
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
                Select whether each statement is true or false.
            </p>
            <br/>
            {_.map(this.props.explanations, (e, idx: number) => {
                let question = e;
                return <div style={{paddingTop: 0}} key={question}>
                    <SelectQuestion
                        question={`${1+idx}. ${question}`}
                        options={['True', 'False']}
                        selected={this.state[question]}
                        onChange={(v) => {
                            const state = {};
                            state[question] = v;
                            this.setState(state);
                        }}
                        questionWidth={750}/>
                </div>
            })}

            <br/>
            <div style={{textAlign: "right"}}>
                <ButtonFooter onBack={this.goToPrev.bind(this)} onNext={this.onSubmit.bind(this)}/>
            </div>
        </div>
    }
}