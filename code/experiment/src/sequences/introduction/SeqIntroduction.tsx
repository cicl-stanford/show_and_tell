import React from 'react';
import Sequence from "../../misc/Sequence";
import SeqInstructionsIntro from "./SeqInstructionsIntro";
import SeqConsentForm from "./SeqConsentForm";
import SeqInstructionsCausalDevice from "./SeqInstructionsCausalDevice";
import SeqInstructionsTask from "./SeqInstructionsTask";
import SeqInstructionsExplanations from "./SeqInstructionsExplanations";
import SeqInstructionsExplanationsDouble from "./SeqInstructionsExplanationsDouble";
import SeqInstructionsExplanationsInactive from "./SeqInstructionsExplanationsInactive";
import SeqInstructionsArrows from "./SeqInstructionsArrows";
import SeqComprehensionCheck1 from "./SeqComprehensionCheck1";
import SeqWhatHappened from "./SeqWhatHappened";
import {Mode} from "../../components/graph/Edge";
import SeqCompCheckExplanations from "./SeqCompCheckExplanationsNew";
import {Explanation} from "../../misc/Explanation";
import SeqInstructionsNoCycles from "./SeqInstructionsNoCycles";
import SeqSampleActivation from "../sample_activation/SeqSampleActivation";
import SeqVocabQuiz from "./VocabQuiz";
import SeqCompanyIntroduction from "./SeqCompanyIntroduction";
import SeqCompanyIntroduction2 from "./SeqCompanyIntroduction2";
import SeqCompanyIntroduction3 from "./SeqCompanyIntroduction3";

export default class SeqIntroduction extends Sequence {

  constructor(props: any) {
    super(props);

    this.addSubsequence(SeqConsentForm);
    this.addSubsequence(SeqInstructionsIntro);
    this.addSubsequence(SeqInstructionsCausalDevice);
    this.addSubsequence(SeqSampleActivation);
    this.addVocabQuiz();
    this.addSubsequence(SeqCompanyIntroduction);
    this.addSubsequence(SeqCompanyIntroduction2);
    this.addSubsequence(SeqCompanyIntroduction3);
    this.addSubsequence(SeqInstructionsTask);
    this.addSubsequence(SeqComprehensionCheck1);
    this.addSubsequence(SeqInstructionsExplanations);
    this.addSubsequence(SeqInstructionsExplanationsDouble);
    this.addCompCheckExplanationSequenceActive();
    this.addSubsequence(SeqInstructionsExplanationsInactive);
    this.addCompCheckExplanationSequenceInactive();
    //this.addSubsequence(SeqWhatNotHappened1);
    //this.addSubsequence(SeqWhatNotHappened2);
    //this.addSubsequence(SeqWhatNotHappened3);
    //this.addSubsequence(SeqWhatNotHappened4);
    this.addSubsequence(SeqInstructionsArrows);
    this.addSubsequence(SeqInstructionsNoCycles);
  }

  addVocabQuiz(){
    this.addSubsequence(SeqVocabQuiz, {
      explanations: [
          "There is a connection from B to A.",
          "There is a connection from A to B.",
          "A activated.",
          "The connection from A to C worked.",
          "The connection from B to C didn't work."
      ],
      solutions: [true, false, true, false, true],
      nodeA: true,
      nodeB: true,
      nodeC: false,
      edgeAB: Mode.Backward,
      edgeAC: Mode.Forward,
      edgeBC: Mode.Forward,
      edgeABActive: true,
      edgeACActive: false,
      edgeBCActive: false
    });
  }


  addCompCheckExplanationSequenceActive() {
    this.addSubsequence(SeqCompCheckExplanations, {
      explanation: new Explanation('B', 'C', true, true),
      type: "Active",
      devices: [
        'Device 1 Active',
        'Device 2 Active',
        'Device 3 Active',
        'Device 4 Active',
        'Device 5 Active',
        'Device 6 Active'
      ],
      solutions: [true, false, true, false, false, true],
      messages: [
        "There is a working connection from B to C, and B and C activated. So C activated because B activated.",
        "There are no connections between B and C, so B did not cause C to activate.",
        "There is a working connection from B to C, and B and C activated. So C activated because B activated.",
        "B did not activate, so it could not have been the cause of C activating.",
        "The connection from B to C didn't work, and C didn't activate.",
        " B caused A to activate, and A caused C to activate, so B caused C to activate."
      ],
      graphTrees: [
        {nodeA: false, nodeB: true, nodeC: true, edgeAB: null, edgeBC: Mode.Forward, edgeAC: null,
          edgeABActive: null, edgeBCActive: true, edgeACActive: null},
        {nodeA: false, nodeB: true, nodeC: true, edgeAB: null, edgeBC: null, edgeAC: null,
          edgeABActive: null, edgeBCActive: null, edgeACActive: null},
        {nodeA: true, nodeB: true, nodeC: true, edgeAB: null, edgeBC: Mode.Forward, edgeAC: Mode.Forward,
          edgeABActive: null, edgeBCActive: true, edgeACActive: true},
        {nodeA: true, nodeB: false, nodeC: true, edgeAB: null, edgeBC: null, edgeAC: Mode.Forward,
          edgeABActive: null, edgeBCActive: null, edgeACActive: true},
        {nodeA: true, nodeB: true, nodeC: false, edgeAB: null, edgeBC: Mode.Forward, edgeAC: null,
          edgeABActive: null, edgeBCActive: false, edgeACActive: null},
        {nodeA: true, nodeB: true, nodeC: true, edgeAB: Mode.Backward, edgeBC: null, edgeAC: Mode.Forward,
          edgeABActive: true, edgeBCActive: null, edgeACActive: true}
      ]
    });
    this.addSubsequence(SeqCompCheckExplanations, {
      explanation: new Explanation('A', 'B', true, false),
      type: "Active Not",
      devices: [
        'Device 1 Active Not',
        'Device 2 Active Not',
        'Device 3 Active Not',
        'Device 4 Active Not',
        'Device 5 Active Not',
        'Device 6 Active Not'
      ],
      solutions: [true, true, false, false, false, true],
      messages: [
        "Although B and A both activated, there are no connections between B and A. This means A was not the cause of B activating.",
        "There are no connections between any of the nodes, so A could not have been the cause of B activating.",
        "A caused C to activate, and C caused B to activate, so A caused B to activate. This means B activated because A activated.",
        "There is a working connection from A to B, and A activated, so B activated because A activated.",
        "There is a working connection from A to B, and A activated, so B activated because A activated.",
        "B caused A to activate, so A was not the cause of B activating."
      ],
      graphTrees: [
        {nodeA: true, nodeB: true, nodeC: true, edgeAB: null, edgeBC: Mode.Backward, edgeAC: null,
          edgeABActive: null, edgeBCActive: true, edgeACActive: null},
        {nodeA: true, nodeB: true, nodeC: false, edgeAB: null, edgeBC: null, edgeAC: null,
          edgeABActive: null, edgeBCActive: null, edgeACActive: null},
        {nodeA: true, nodeB: true, nodeC: true, edgeAB: null, edgeBC: Mode.Backward, edgeAC: Mode.Forward,
          edgeABActive: null, edgeBCActive: true, edgeACActive: true},
        {nodeA: true, nodeB: true, nodeC: true, edgeAB: Mode.Forward, edgeBC: Mode.Forward, edgeAC: null,
          edgeABActive: true, edgeBCActive: true, edgeACActive: null},
        {nodeA: true, nodeB: true, nodeC: true, edgeAB: Mode.Forward, edgeBC: null, edgeAC: null,
          edgeABActive: true, edgeBCActive: null, edgeACActive: null},
        {nodeA: true, nodeB: true, nodeC: false, edgeAB: Mode.Backward, edgeBC: null, edgeAC: null,
          edgeABActive: true, edgeBCActive: null, edgeACActive: null}
      ]
    });
  }

  addCompCheckExplanationSequenceInactive() {
    this.addSubsequence(SeqCompCheckExplanations, {
      explanation: new Explanation('C', 'A', false, true),
      type: "Inactive",
      devices: [
        'Device 1 Inactive',
        'Device 2 Inactive',
        'Device 3 Inactive',
        'Device 4 Inactive',
        'Device 5 Inactive',
        'Device 6 Inactive'
      ],
      solutions: [true, false, true, true, false, true],
      messages: [
        "There is a working connection from C to A, so A would have activated if C had activated.",
          "The connection from C to A is not working, so A would not have activated if C had activated.",
          "There is a working connection from C to A, so A would have activated if C had activated",
          "There is a working connection from C to B, and a working connection from B to A. This means A would have activated" +
          " if C had activated. ",
          "The connection from B to A is not working, so A would not have activated, even if C had activated.",
          "There is a working connection from C to A, so A would have activated if C had activated. "
      ],
      graphTrees: [
        {nodeA: false, nodeB: true, nodeC: false, edgeAB: null, edgeBC: null, edgeAC: Mode.Backward,
          edgeABActive: null, edgeBCActive: null, edgeACActive: true},
        {nodeA: false, nodeB: true, nodeC: false, edgeAB: null, edgeBC: null, edgeAC: Mode.Backward,
          edgeABActive: null, edgeBCActive: null, edgeACActive: false},
        {nodeA: false, nodeB: false, nodeC: false, edgeAB: Mode.Backward, edgeBC: null, edgeAC: Mode.Backward,
          edgeABActive: true, edgeBCActive: null, edgeACActive: true},
        {nodeA: false, nodeB: false, nodeC: false, edgeAB: Mode.Backward, edgeBC: Mode.Backward, edgeAC: null,
          edgeABActive: true, edgeBCActive: true, edgeACActive: null},
        {nodeA: false, nodeB: false, nodeC: false, edgeAB: Mode.Backward, edgeBC: Mode.Backward, edgeAC: null,
          edgeABActive: false, edgeBCActive: true, edgeACActive: null},
        {nodeA: false, nodeB: true, nodeC: false, edgeAB: Mode.Backward, edgeBC: Mode.Backward, edgeAC: Mode.Backward,
          edgeABActive: false, edgeBCActive: false, edgeACActive: true}
      ]
    });
    this.addSubsequence(SeqCompCheckExplanations, {
      explanation: new Explanation('A', 'B', false, false),
      type: "Inactive Not",
      devices: [
        'Device 1 Inactive Not',
        'Device 2 Inactive Not',
        'Device 3 Inactive Not',
        'Device 4 Inactive Not',
        'Device 5 Inactive Not',
        'Device 6 Inactive Not'
      ],
      solutions: [false, true, true, false, false, true],
      messages: [
        "There is a working connection from A to B, so B would have activated if A had activated.",
        "The connection from A to B did not work, so B would not have activated, even if A had activated.",
        "There are no connections between the nodes, so there is no reason why B would have activated if A had activated.",
        "There is a working connection from A to C, and A working connection from C to B. This means B would have activated if A had " +
        "activated. ",
        "There is a working connection from A to B, so B would have activated if A had activated.",
        "Since there is no working connection going from A to B, B would not have activated, even if A had activated. "
      ],
      graphTrees: [
        {nodeA: false, nodeB: false, nodeC: false, edgeAB: Mode.Forward, edgeBC: Mode.Backward, edgeAC: null,
          edgeABActive: true, edgeBCActive: true, edgeACActive: null},
        {nodeA: false, nodeB: false, nodeC: true, edgeAB: Mode.Forward, edgeBC: null, edgeAC: null,
          edgeABActive: false, edgeBCActive: null, edgeACActive: null},
        {nodeA: false, nodeB: false, nodeC: true, edgeAB: null, edgeBC: null, edgeAC: null,
          edgeABActive: null, edgeBCActive: null, edgeACActive: null},
        {nodeA: false, nodeB: false, nodeC: false, edgeAB: null, edgeBC: Mode.Backward, edgeAC: Mode.Forward,
          edgeABActive: null, edgeBCActive: true, edgeACActive: true},
        {nodeA: false, nodeB: false, nodeC: true, edgeAB: Mode.Forward, edgeBC: Mode.Forward, edgeAC: Mode.Forward,
          edgeABActive: true, edgeBCActive: true, edgeACActive: false},
        {nodeA: false, nodeB: false, nodeC: true, edgeAB: Mode.Backward, edgeBC: Mode.Backward, edgeAC: Mode.Backward,
          edgeABActive: true, edgeBCActive: false, edgeACActive: false}
      ]
    });
  }


  addWhatHappenedSequence() {
    this.addSubsequence(SeqWhatHappened, {
      deviceName: 'Bik',
      day: 1,
      description: <div>
        Consider the above device. Suppose that on Day 1, all components activated.
        The connection from A to B didn't work, so although B activated,
        it was because B activated on its own and not because A activated it.
        The connection from B to C did work, so B activated C.
        <br/>
        <br/>
        When the robot says "C activated because B activated", this means that a connection from B to C,
        either direct (B to C) or indirect (B to A and A to C), exists and worked on this day.
        <br/>
        <br/>
        When the robot says "B activated, but not because A activated", this means that either
        no connection exists from A to B, <b>or</b> that the connection exists but did not work on this day.
      </div>,
      edgeAB: Mode.Forward,
      edgeBC: Mode.Forward,
      edgeABActive: false,
      edgeBCActive: true,
      nodeA: true,
      nodeB: true,
      nodeC: true
    });
    this.addSubsequence(SeqWhatHappened, {
      deviceName: 'Bik',
      day: 2,
      description: <div>
        The robot may also give explanations about <b>inactive</b> components.
        Suppose on Day 2, no components activated. However, this time, both the connection from A to B and the
        connection from B to C worked.
        This means B would have activated if A had activated, and C would have activated if B had activated.
        C also would have activated had A activated, since A would have activated B.
        <br/>
        <br/>
        When the robot says "C would have activated if A had activated", this means that a connection from A to C,
        either direct (A to C) or indirect (A to B and B to C), exists and worked on this day.
        <br/>
        <br/>
        When the robot says "A would not have activated, even if B had activated", this means that either
        no connection exists from B to A, <b>or</b> that the connection exists but did not work on this day.
      </div>,
      edgeAB: Mode.Forward,
      edgeBC: Mode.Forward,
      edgeABActive: true,
      edgeBCActive: true,
      nodeA: false,
      nodeB: false,
      nodeC: false
    });
    this.addSubsequence(SeqWhatHappened, {
      deviceName: 'Bik',
      day: 3,
      description: <div>
        On Day 3, only component A activated. The connection from A to B didn't work, so A couldn't activate B.
        The connection from B to C did work, so if B had activated, so would have C.
        <br/><br/>
        Recall that the robot will only give explanations about two active components or two inactive
        components, <b>never about one active and one inactive component</b>.
        Therefore, whenever only 1 or 2 components are active, as in this example,
        the robot will only choose between two explanations.
      </div>,
      edgeAB: Mode.Forward,
      edgeBC: Mode.Forward,
      edgeABActive: false,
      edgeBCActive: true,
      nodeA: true,
      nodeB: false,
      nodeC: false
    });
    this.addSubsequence(SeqWhatHappened, {
      deviceName: 'Vem',
      day: 1,
      description: "Now, consider a new device, shown above. On Day 1, all components activated" +
          " and both the connection from A to C and the connection from B to C worked." +
          " In this case, both A and B individually activated C, so the robot could explain" +
          " either that C activated because A activated, or that C activated because B activated.",
      edgeBC: Mode.Forward,
      edgeAC: Mode.Forward,
      edgeACActive: true,
      edgeBCActive: true,
      nodeA: true,
      nodeB: true,
      nodeC: true
    });
  }

  addCompCheckExplanationSequence() {
    this.addSubsequence(SeqCompCheckExplanations, {
      explanations: [
        new Explanation('B', 'A', true, true),
        new Explanation('C', 'B', false, false),
        new Explanation('B', 'C', true, true),
        new Explanation('B', 'C', true, false),
        new Explanation('A', 'B', true, false),
      ],
      solutions: [true, false, true, false, true],
      nodeA: true,
      nodeB: true,
      nodeC: true,
      edgeAB: Mode.Backward,
      edgeAC: Mode.Forward,
      edgeABActive: true,
      edgeACActive: true
    });
    this.addSubsequence(SeqCompCheckExplanations, {
      explanations: [
        new Explanation('B', 'C', false, false),
        new Explanation('B', 'A', true, false),
        new Explanation('A', 'C', false, true),
        new Explanation('C', 'A', false, false),
        new Explanation('A', 'B', true, false),
      ],
      solutions: [false, false, true, true, false],
      nodeB: true,
      edgeAB: Mode.Backward,
      edgeAC: Mode.Forward,
      edgeBC: Mode.Forward,
      edgeABActive: false,
      edgeACActive: true,
      edgeBCActive: false
    });
    this.addSubsequence(SeqCompCheckExplanations, {
      explanations: [
        new Explanation('B', 'C', true, true),
        new Explanation('C', 'A', true, true),
        new Explanation('A', 'B', true, true),
        new Explanation('C', 'A', true, false),
        new Explanation('C', 'B', true, false),
      ],
      solutions: [false, false, true, false, false],
      nodeA: true,
      nodeB: true,
      edgeAB: Mode.Forward,
      edgeAC: Mode.Backward,
      edgeBC: Mode.Backward,
      edgeABActive: true,
      edgeACActive: true,
      edgeBCActive: false
    });
    this.addSubsequence(SeqCompCheckExplanations, {
      explanations: [
        new Explanation('C', 'B', false, true),
        new Explanation('C', 'A', false, true),
        new Explanation('B', 'C', false, true),
        new Explanation('C', 'A', true, true),
        new Explanation('A', 'B', false, false),
        new Explanation('C', 'B', false, false),
      ],
      solutions: [false, true, false, false, true, true],
      edgeAC: Mode.Backward,
      edgeBC: Mode.Backward,
      edgeACActive: true,
      edgeBCActive: false
    });
  }

}