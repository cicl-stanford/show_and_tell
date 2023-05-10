import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import ButtonFooter from "../../components/ButtonFooter";
import { Mode } from "../../components/graph/Edge";

export default class SeqSampleActivation6 extends Sequence {

  render() {
    const pRoot = 100 * this.props.data.experimentData.graphParams.pRoot;
    const pEdge = 100 * this.props.data.experimentData.graphParams.pEdge;
    const pNonRoot = 100 * this.props.data.experimentData.graphParams.pNonRoot;

    return (
      <div>
        <h1>Device Example</h1>

        <p>
            Note that the components in a device sometimes activate, and sometimes don't.
          Similarly, the connections in a device sometimes work, and sometimes don't.
            Connections have a 90% chance of working. Three examples of activation patterns
            for the same device are shown below.
          <br/>
        </p>
        <br/>
        <div className="grid">
          <div className="col-4">
            <h3>Example 1</h3>
            <br/>
            <CausalGraphThree
              width={250}
              radius={35}
              edgeAB={Mode.Backward}
              edgeAC={Mode.Backward}
              edgeABActive={true}
              edgeACActive={false}
              nodeA={false}
              nodeB={false}
              nodeC={true}
            />
          </div>
          <div className="col-4">
            <h3>Example 2</h3>
            <br/>
            <CausalGraphThree
              width={250}
              radius={35}
              edgeAB={Mode.Backward}
              edgeAC={Mode.Backward}
              edgeABActive={false}
              edgeACActive={false}
              nodeA={true}
              nodeB={false}
              nodeC={true}
            />
          </div>
          <div className="col-4">
            <h3>Example 3</h3>
            <br/>
            <CausalGraphThree
              width={250}
              radius={35}
              edgeAB={Mode.Backward}
              edgeAC={Mode.Backward}
              edgeABActive={true}
              edgeACActive={true}
              nodeA={true}
              nodeB={true}
              nodeC={true}
            />
          </div>
        </div>

        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
      </div>
    );
  }
}