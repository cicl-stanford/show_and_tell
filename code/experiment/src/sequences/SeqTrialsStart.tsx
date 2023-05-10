import React from 'react';
import Sequence from "../misc/Sequence";
import {toUSD} from "../misc/utils";
import {CONFIG} from "../config";
import ButtonFooter from "../components/ButtonFooter";


export default class SeqTrialsStart extends Sequence {

  render() {
    return (
      <div>
        <h1>Instructions</h1>

        <p>
          Thank you for completing the comprehension checks.
          You are now ready to begin the experiment.
          <br/><br/>
          You will get to see 6 different device models. Each of 10 companies will receive one device of each model.
          Each time a company tests their device, you will be able to indicate your current best guess for
          how the model works by adjusting the arrows between the components.
          <br/><br/>
          After you've seen a certain model in action for 10 different companies, we will show you how the model actually works.
          For each causal connection that you correctly identified, you will receive a bonus
          of {toUSD(CONFIG.reward_per_edge)}.
          You will also get {toUSD(CONFIG.reward_per_edge)} on every company for which you correctly identified
          that there is no causal connection between two components.
          Because you get a bonus on for any given company, <b>you will get a higher bonus overall
          the earlier you figure out how the model works.</b>
          <br/><br/>
          Click Next to begin the experiment.
          <br/><br/>
          <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
        </p>
      </div>
    );
  }
}