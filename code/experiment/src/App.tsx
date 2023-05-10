import React from 'react';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import './App.css';
import SeqMain from "./sequences/SeqMain";
import {getUrlParams, parseString, sleep} from "./misc/utils";
import {Data} from "./misc/Data";
import {getNewExperimentData} from "./misc/serviceLayer";
import {CONFIG, loadConfig} from "./config";
import SeqExamples from "./sequences/inactive/SeqExamples";

export default class App extends React.Component<any, any> {
  data: Data;

  state: {
    dataLoaded: boolean
  };

  constructor(props: any) {
    super(props);
    this.state = {
      dataLoaded: false
    };
  }

  async componentDidMount() {
    await loadConfig();
    this.setState({configLoaded: true});

    const urlParams = getUrlParams();
    const sessionParams = {
      prolificPid: urlParams['PROLIFIC_PID'],
      studyId: urlParams['STUDY_ID'],
      sessionId: urlParams['SESSION_ID']
    }
    console.log("Loading data");
    this.data = new Data(sessionParams, await getNewExperimentData(sessionParams.prolificPid));
    if (CONFIG.dev_mode) {
      for (let [key, value] of Object.entries(urlParams)) {
        if (key in this.data.experimentData.conditions) {
          this.data.experimentData.conditions[key] = value;
        }
      }
      console.log(CONFIG);
      console.log(urlParams);
      console.log(this.data);
    }

    await this.data.post(true);
    this.setState({dataLoaded: true});
    console.log(this.data);
  }

  render() {
    return (
      <div className="App">
        {this.state.dataLoaded ? <SeqMain data={this.data}/> : "Loading"}
        {/*SeqExamples is just for making figures.*/}
        {/*{this.state.dataLoaded ? <SeqExamples data={this.data}/> : "Loading"}*/}
        
      </div>
    );
  }
}