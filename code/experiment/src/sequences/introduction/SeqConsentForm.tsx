import React from 'react';
import Sequence from "../../misc/Sequence";
import { Button } from 'primereact/button';
import {CONFIG} from "../../config";


export default class SeqConsentForm extends Sequence {

  render() {
    return (
      <div>
        <h1>Consent Form</h1>
        <p>
          Welcome! You are invited to participate in a research study in cognitive psychology.
          You will be asked to perform various tasks on a computer which may include:
          looking at images or videos, listening to sounds, reading scenarios, or playing games.
          You may be asked a number of different questions about making judgments and intepreting people's actions.
          All information collected will remain confidential.
          <br/><br/>
          <b>Requirements:</b> Please ensure that you can see the full width (horizontal length) of the program,
          marked by the yellow background.
          The program requires that the full width be visible, or it may malfunction.
          You do not need to fit the full height (vertical length) of the program, and you may scroll vertically
          if necessary.
          If you are unable set your window size to fit the full width, please exit the study.
          <br/><br/>
          <b>Risks and benefits:</b> Risks involved in this study are the same as those normally
          associated with using a computer (e.g. mild eye/arm strain).
          If you have any pre-existing conditions that might make reading and completing
          a computer-based survey strenuous for you, you should probably elect to not participate in this study.
          If at any time during the study you feel unable to participate because you are experiencing strain,
          you may end your participation without penalty.
          We cannot and do guarantee or promise that you will receive any benefits from this study.
          Your decision whether or not to participate in this study will not affect
          your employment, medical care, and/or grades in school.
          <br/><br/>
          <b>Time involvement:</b> Your participation in this experiment will take
          approximately {CONFIG.appx_duration} minutes.
          <br/><br/>
          <b>Payment:</b> If recruitment materials indicate payment (e.g., Prolific or other recruitment),
          you will receive compensation as indicated.
          <br/><br/>
          <b>Subject's rights:</b> If you have read this notice and
          have decided to participate in this project, please understand
          your participation is voluntary and you have the right to
          withdraw your consent or discontinue participation at any
          time without penalty or loss of benefits to which you are
          otherwise entitled. You have the right to refuse to answer
          particular questions. Your individual privacy will be
          maintained in all published and written data resulting from
          the study.
          <br/><br/>
          <b>Contact information:</b> If you have any questions,
          concerns or complaints about this research study, its
          procedures, or risks and benefits, you should ask the
          Protocol Director, (Professor Tobias Gerstenberg, Phone:
          (650) 725-2431; Email: gerstenberg@stanford.edu).
          <br/><br/>
          <b>Independent contact:</b> If you are not satisfied with how this study is being conducted,
          or if you have any concerns, complaints,
          or general questions about the research or your rights as a participant, please contact the Stanford
          Institutional Review Board (IRB) to speak to someone independent of the research team via email at
          irb2-manager@lists.stanford.edu, or via phone at (650) 723-2480 or toll free at 1-866-680-2906.
          You can also write to the Stanford IRB, Stanford University, 3000 El
          Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306.
          <br/><br/>
          You may want to print a copy of this consent form to keep.
          <br/><br/>
          By clicking the button below, you acknowledge that
          you have read the above information, that you are 18 years
          of age, or older and give your consent to participate in
          our internet-based study and consent for us to analyze the
          resulting data.
          <br/><br/>
          Do you agree with the terms of the experiment as explained
          above?
        </p>
        <br/>
        <Button label="I agree" icon="pi pi-check" className="p-button-success" onClick={this.goToNext}/>
      </div>
    );
  }
}