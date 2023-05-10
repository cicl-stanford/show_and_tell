import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import ButtonFooter from "../../components/ButtonFooter";
import { Mode } from "../../components/graph/Edge";

export default class SeqSampleActivation2 extends Sequence {

  render() {
    const pRoot = 100 * this.props.data.experimentData.graphParams.pRoot;
    const pEdge = 100 * this.props.data.experimentData.graphParams.pEdge;
    const pNonRoot = 100 * this.props.data.experimentData.graphParams.pNonRoot;

    return (
      <div>
        <h1>Device Example</h1>

        <p>
          First, let's look at the components without any incoming connections, in this case, components B and C.
          These components have a {pRoot}% chance to activate.
          This time, B activated but C did not.
        </p>
        <br/>
        <CausalGraphThree
          width={250}
          radius={35}
          nodeB={true}
          edgeAB={Mode.Backward}
          edgeAC={Mode.Backward}
        />
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}