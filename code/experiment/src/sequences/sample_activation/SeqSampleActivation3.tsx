import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import ButtonFooter from "../../components/ButtonFooter";
import { Mode } from "../../components/graph/Edge";

export default class SeqSampleActivation3 extends Sequence {

  render() {
    const pRoot = 100 * this.props.data.experimentData.graphParams.pRoot;
    const pEdge = 100 * this.props.data.experimentData.graphParams.pEdge;
    const pNonRoot = 100 * this.props.data.experimentData.graphParams.pNonRoot;

    return (
      <div>
        <h1>Device Example</h1>

        <p>
          Next, we consider their connections.
          Each connection has a {pEdge}% chance of working.
          We consider both connections from B to A and from C to A, even though C is not active.
          <br/>
          <br/>
          This time, the connection from C to A worked, but the connection from B to A did not.
          We show this with <span style={{color: 'limegreen'}}>✔</span> from C to A,
          and <span style={{color: 'red'}}>✘</span> from B to A.
          In the experiment later, this won't be shown.
          <br/>
          <br/>
          This means that although B activated, it didn't activate A, since the connection did not work.
          This also means that had C been active, A would have activated since the connection from C to A did work.
        </p>
        <br/>
        <CausalGraphThree
          width={250}
          radius={35}
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