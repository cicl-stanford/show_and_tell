import Sequence from "../../misc/Sequence";
import CausalGraphThree from "../../components/CausalGraphThree";
import ButtonFooter from "../../components/ButtonFooter";
import { Mode } from "../../components/graph/Edge";

export default class SeqCompanyIntroduction extends Sequence {

    render() {
        const pRoot = 100 * this.props.data.experimentData.graphParams.pRoot;
        const pEdge = 100 * this.props.data.experimentData.graphParams.pEdge;
        const pNonRoot = 100 * this.props.data.experimentData.graphParams.pNonRoot;

        return (
            <div>
                <h1>Models and Companies</h1>

                <p>
                    During the experiment, you'll be shown the results of different <b>companies</b> testing
                    different <b>models</b> of devices.
                    <br/>
                    <br/>

                    Every device model has a name. Devices of the same model have the same causal structure.
                    Here are three examples of device models.
                    <br/>
                </p>
                <br/>
                <div className="grid">
                    <div className="col-4">
                        <h3><i>Ber 3000</i></h3>
                        <br/>
                        <CausalGraphThree
                            width={250}
                            radius={35}
                            edgeAC={Mode.Forward}
                            nodeA={false}
                            nodeB={false}
                            nodeC={false}
                        />
                    </div>
                    <div className="col-4">
                        <h3><i>Dax 8200</i></h3>
                        <br/>
                        <CausalGraphThree
                            width={250}
                            radius={35}
                            edgeAB={Mode.Backward}
                            edgeBC={Mode.Backward}
                            nodeA={false}
                            nodeB={false}
                            nodeC={false}
                        />
                    </div>
                    <div className="col-4">
                        <h3><i>Fep 100</i></h3>
                        <br/>
                        <CausalGraphThree
                            width={250}
                            radius={35}
                            edgeAB={Mode.Backward}
                            edgeAC={Mode.Backward}
                            nodeA={false}
                            nodeB={false}
                            nodeC={false}
                        />
                    </div>
                </div>

                <br/>
                <ButtonFooter onBack={this.goToPrev} onNext={this.goToNext}/>
            </div>
        );
    }
}