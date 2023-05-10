import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import ButtonFooter from "../../components/ButtonFooter";
import { Mode } from "../../components/graph/Edge";

export default class SeqSampleActivation5 extends Sequence {

  render() {
    return (
      <div>
        <h1>Device Example</h1>

        <p>
          During the experiment, you will only see which components activated (but not which connections were working).
          So here is what you would see in the experiment for the example we went through.
          <br/>
        </p>
        <br/>
        <CausalGraphThree
          width={250}
          radius={35}
          nodeA={true}
          nodeB={true}
        />
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}