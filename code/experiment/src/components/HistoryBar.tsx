import React, {ComponentProps} from "react";
import {Observation} from "../misc/serviceLayer";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import './HistoryBar.css';

export default class HistoryBar extends React.Component<ComponentProps<any>> {

  props: {
    showActivations: boolean
    showExplanations: boolean
    observations: Observation[]
    companies: string[]
  }

  nodeTemplate(observation: Observation, node: string) {
    return <span className='circle'
                 style={{backgroundColor: observation.activations[node] ? 'yellow' : '#E5E5E5'}} />
  }

  companyTemplate(observation: Observation) {
    return <span>
      {this.props.companies[observation.obsIdx]}
    </span>
  }

  render() {
    return (
      <div style={{justifyContent: "space-between"}}>
          <DataTable value={this.props.observations} size="large">
            <Column header="" align='center' body={(o: Observation) => 1 + o.obsIdx } />
            <Column header="Company" align='center'
                    body ={(o: Observation) => this.props.companies[o.obsIdx] }
                    style={{width: '130px'}} />

            { this.props.showActivations
              && ['A', 'B', 'C'].map((col: string) => {
                return <Column header={col} align='center' body={(o: Observation) => this.nodeTemplate(o, col) } />
              })
            }

            { this.props.showExplanations
              && <Column header="Explanation"
              body={(o: Observation) => <span className='explanation'> {o.explanation.stringify()} </span> }
              style={{width: '300px'}}/>
            }
          </DataTable>
      </div>

    )
  }
}