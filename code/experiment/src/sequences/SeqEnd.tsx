import React from 'react';
import Sequence from "../misc/Sequence";
import {toUSD} from "../misc/utils";
import {CONFIG} from "../config";


export default class SeqEnd extends Sequence {

  async componentDidMount() {
    super.componentDidMount();
    await this.props.data.post(true);
  }

  render() {
    const bonus = CONFIG.reward_per_edge * this.props.data.getTotalEdgesSolved();

    return (
      <div>
        <h1>The End</h1>
        <p>
          Thank you for completing the study!
          <br/><br/>
          Your completion code is <b>{CONFIG.completion_code}</b>.
          <br/><br/>
          You will be paid {toUSD(CONFIG.base_reward)} once you submit the code to Prolific.
          Your bonus of {toUSD(bonus)} will be paid within a few days.
          <br/><br/>
          You may close the window.
        </p>
      </div>
    );
  }
}