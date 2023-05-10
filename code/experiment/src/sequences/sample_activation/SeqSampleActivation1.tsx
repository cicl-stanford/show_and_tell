import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import ButtonFooter from "../../components/ButtonFooter";
import { Mode } from "../../components/graph/Edge";

export default class SeqSampleActivation1 extends Sequence {
  render() {
    return (
      <div>
        <h1>Device Example</h1>

        <p>
          Take the device shown below.
          Let's consider how might it activate.
        </p>
        <br/>
        <CausalGraphThree
          width={250}
          radius={35}
          edgeAB={Mode.Backward}
          edgeAC={Mode.Backward}
        />
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}