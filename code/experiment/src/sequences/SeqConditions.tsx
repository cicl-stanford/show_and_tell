import React from 'react';
import Sequence from "../misc/Sequence";
import ButtonFooter from "../components/ButtonFooter";


export default class SeqConditions extends Sequence {

  render() {
    const showActivations = this.props.data.experimentData.conditions.showActivations;
    const showExplanations = this.props.data.experimentData.conditions.showExplanations;

    return (
      <div>
        <h1>Testing Devices</h1>

        {/* Both condition */}
        {showActivations && showExplanations &&
          <p>
            Fortunately, it turns out that every company has access to the robot!
            <br/><br/>
            The robot will always provide an explanation for what happened for every device.
          </p>
        }

        {/* Activation only condition */}
        {showActivations && !showExplanations &&
            <p>
              Unfortunately, it turns out that none of the companies have access to the robot!
              <br/><br/>
              You will not see an explanation for what happened for any device.
            </p>
        }

        {/* Explanation only condition */}
        {!showActivations && showExplanations &&
            <p>
              Unfortunately, it turns out that all of the devices have defective lights, and so
              active nodes look as if they are inactive!
              Although the activations are no longer visible by their colors,
              every company has access to the robot, which is still able to detect which components activated.
              <br/><br/>
              You will not be able to see which components activated,
              but the robot will always provide an explanation for what happened for every device.
            </p>
        }
        <br/><br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}