import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import ButtonFooter from "../../components/ButtonFooter";
import { Mode } from "../../components/graph/Edge";

export default class SeqSampleActivation4 extends Sequence {

  render() {
    const pRoot = 100 * this.props.data.experimentData.graphParams.pRoot;
    const pEdge = 100 * this.props.data.experimentData.graphParams.pEdge;
    const pNonRoot = 100 * this.props.data.experimentData.graphParams.pNonRoot;

    return (
      <div>
        <h1>Device Example</h1>

        <p>
          Although A was not activated by B or C in this case, it still had
          a {pNonRoot}% chance to activate on its own, and this is what happened here.
          <br/>
          <br/>
          A activated on its own, because neither B nor C caused it to activate.
        </p>
        <br/>
        <CausalGraphThree
          width={250}
          radius={35}
          nodeA={true}
          nodeB={true}
          edgeAB={Mode.Backward}
          edgeAC={Mode.Backward}
          edgeABActive={false}
          edgeACActive={true}
        />
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}