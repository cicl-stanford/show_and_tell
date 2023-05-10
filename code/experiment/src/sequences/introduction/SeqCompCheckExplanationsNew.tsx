import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Explanation} from "../../misc/Explanation";
import React, {createRef, RefObject} from "react";
import ExplanationBubble from "../../components/ExplanationBubble";
import ButtonFooter from "../../components/ButtonFooter";
import {Toast} from "primereact/toast";
import {mapToObject} from "../../misc/utils";
import {Data} from "../../misc/Data";
import CompQuestion from "../../components/survey/CompQuestion";
const _ = require('lodash');



export default class SeqCompCheckExplanations extends Sequence {

    props: {
        data: Data
        explanation: Explanation  // Explanation to be given
        devices: string[]  // Names of Devices
        graphTrees: {[key: string]: null | boolean}[]  //  6 graphs to be given
        messages: string[]  // Messages given during feedback
        solutions: boolean[] // solutions to the quiz
        type: string  // (Active, Active Not, Inactive, Inactive Not)
    }


    refToast: RefObject<Toast>;
    counter: number
    colorMap: {[key: string]: null | string}
    messageList: {[key: string]: null | string}
    state: {[key: string]: null | string}

    constructor(props: any) {
        super(props);
        this.counter = 0;
        this.colorMap = mapToObject(props.devices, (d:string)=> [d, 'transparent'])
        this.messageList = mapToObject(props.devices, (d:string)=> [d, ''])
        this.state = mapToObject(props.devices, (d: string) => [d, null]);
        this.refToast = createRef();
        this.onSubmit = this.onSubmit.bind(this);
    }

    giveFeedback() {
        const solutions = mapToObject(_.zip(this.props.devices, this.props.solutions),
            (a) => [a[0], a[1] ? 'Yes' : 'No']);
        for (let index in this.props.devices) {
            if (!_.isEqual(this.state[this.props.devices[index]], solutions[this.props.devices[index]])) {
                this.colorMap[this.props.devices[index]] = 'pink';
                this.messageList[this.props.devices[index]] = 'Incorrect. ' + this.props.messages[index]
            } else {
                this.colorMap[this.props.devices[index]] = 'lightgreen';
                this.messageList[this.props.devices[index]] = 'Correct! ' + this.props.messages[index]
            }
            this.forceUpdate();
        }
    }

    onSubmit() {
        _.forEach(this.state, (value: any, key: string) =>
            this.props.data.recordQuestionResponse(this, key, value));
        const solutions = mapToObject(_.zip(this.props.devices, this.props.solutions),
            (a) => [a[0], a[1] ? 'Yes' : 'No']);
        if (this.counter === 0) {
            if (!_.isEqual(this.state, solutions)) {
                this.counter = 1;
                this.refToast.current!.show({
                    severity: 'error',
                    summary: 'Incorrect',
                    detail: `One or more of your responses are incorrect.
                     Please check the instructions again and correct your responses.`,
                    life: 5000
                });
            } else {
                this.giveFeedback();
                this.counter = 2;
            }
        } else if (this.counter === 1){
            this.giveFeedback();
            this.counter = 2;
        } else if (!_.isEqual(this.state, solutions)){
            this.refToast.current!.show({
                severity: 'error',
                summary: 'Incorrect',
                detail: `One or more of your responses are incorrect.
                     Please correct your response before proceeding.`,
                life: 5000
            });
            this.giveFeedback();
        }
        else{
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
            <p>
                The Robot gives the following explanation about a device. For each device, select whether the device is
                consistent with the explanation or not.
            </p>
            <br/>
            <ExplanationBubble
                explanation={this.props.explanation}
                robotOnRight={true}/>
            <br/>
            <div className="grid">
                {_.map(this.props.devices, (d: string, idx: number) => {
                    let num = idx+1
                    let graphTree = this.props.graphTrees[idx];
                    let device = 'Device ' + num + ' ' + this.props.type
                    return <div className="col-4">
                        <h3>Device {1+idx}</h3>
                        <br/>
                        <CausalGraphThree
                            width={220}
                            radius={32}
                            nodeA={graphTree["nodeA"]}
                            nodeB={graphTree["nodeB"]}
                            nodeC={graphTree["nodeC"]}
                            edgeAB={graphTree["edgeAB"]}
                            edgeBC={graphTree["edgeBC"]}
                            edgeAC = {graphTree["edgeAC"]}
                            edgeABActive={graphTree["edgeABActive"]}
                            edgeBCActive={graphTree["edgeBCActive"]}
                            edgeACActive = {graphTree["edgeACActive"]}
                        />
                        <CompQuestion
                            question={``}
                            color = {this.colorMap[device]}
                            options={['Yes', 'No']}
                            selected={this.state[device]}
                            onChange={(v) => {
                                const state = {};
                                state[device] = v;
                                this.setState(state);
                                if(this.counter === 2){
                                    setTimeout(() => { this.giveFeedback(); }, 10);
                                }
                            }}
                            questionWidth={350}/>
                        <p style={{paddingLeft: "25px", paddingRight: "25px"}}>{this.messageList[device]}</p>
                    </div>
                })}
            </div>

            <br/>
            <div style={{textAlign: "right"}}>
                <ButtonFooter onBack={this.goToPrev.bind(this)} onNext={this.onSubmit.bind(this)}/>
            </div>
        </div>
    }
}