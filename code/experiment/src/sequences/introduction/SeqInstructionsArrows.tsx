import React, {createRef, RefObject} from 'react';
import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import {Mode} from "../../components/graph/Edge";
import {Data} from "../../misc/Data";

import { Toast } from 'primereact/toast';
import ButtonFooter from "../../components/ButtonFooter";

interface Props {
  data: Data
  completedCallback: () => void
  goBackCallback: () => void
}

export default class SeqInstructionsArrows extends Sequence {
  props: Props;
  refGraph: RefObject<CausalGraphThree>;
  refToast: RefObject<Toast>;

  constructor(props: Props) {
    super(props);
    this.refToast = createRef();
    this.refGraph = createRef();
  }

  onSubmit = (key: string) => {
    const edges = this.refGraph.current!.getEdgeModes();
    if (edges.edgeAB === Mode.Backward && edges.edgeAC === Mode.Backward && edges.edgeBC === Mode.None) {
      this.goToNext();
    } else {
      this.refToast.current!.show({severity: 'error',
        summary: 'Incorrect',
        detail: 'Please try again.'});
    }
  }

  render() {
    return (
      <div>
        <Toast ref={this.refToast} />

        <h1>Changing Connections</h1>

        <p>
          You can indicate your current best guess of how components are connected by clicking between them.
          Clicking closer to a component will set the arrow pointing towards it.
          If the arrow is already pointing towards it, this will remove the arrow.
          <br/><br/>
          Change the connections in the device below to indicate the following hypothesis:
          B directly causes A, C directly causes A, and neither A nor B directly cause C.
        </p>
        <br/>
        <CausalGraphThree
          width={250}
          radius={35}
          nodeA={true}
          nodeB={true}
          nodeC={true}
          edgeAB={Mode.Forward}
          edgeBC={Mode.Forward}
          enableEdgeOnClick={true}
          ref={this.refGraph}
        />
        <br/>
        <ButtonFooter onBack={this.goToPrev} onNext={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}