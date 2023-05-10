import Sequence from "../../misc/Sequence";
import SeqSampleActivation1 from "./SeqSampleActivation1";
import SeqSampleActivation2 from "./SeqSampleActivation2";
import SeqSampleActivation3 from "./SeqSampleActivation3";
import SeqSampleActivation4 from "./SeqSampleActivation4";
import SeqSampleActivation5 from "./SeqSampleActivation5";
import SeqSampleActivation6 from "./SeqSampleActivation6";

export default class SeqSampleActivation extends Sequence {
  constructor(props: any) {
    super(props);
    this.addSubsequence(SeqSampleActivation1);
    this.addSubsequence(SeqSampleActivation2);
    this.addSubsequence(SeqSampleActivation3);
    this.addSubsequence(SeqSampleActivation4);
    this.addSubsequence(SeqSampleActivation5);
    this.addSubsequence(SeqSampleActivation6);
  }
}