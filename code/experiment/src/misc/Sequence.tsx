import React, {ComponentClass, ComponentProps} from 'react';
import {Data} from "./Data";
import stringify from 'json-stable-stringify';
import _ from 'lodash';
import {now} from "./utils";
import {CONFIG} from "../config";

interface Props {
  data: Data
  completedCallback: () => void
  goBackCallback: () => void
}

interface Subsequence {
  sequence: ComponentClass<any>
  props?: any
  getProps?: () => any
}

/**
 * Sequence extends the standard Component to make transitioning from one Component to next easy.
 * Each Sequence can either be standalone, in which case it functions as a Component,
 * or it can house a subsequence of Sequences.
 *
 * If a Sequence is standalone, it complete() should be called in order for the parent Sequence to proceed.
 * If a Sequence contains subsequences, it will by default call complete() when it runs out of subsequences.
 * complete() simply calls goToNextSubsequence of its parent, but may be overridden for additional functionality.
 *
 * This is a useful abstraction because it allows the parent sequence to be agnostic to the behavior of the child
 * sequence.
 *
 * When defining subsequences, the subsequence props can either be provided at definition time, or at initialization
 * time by providing getProps(), which is called when the Sequence is ready to load.
 *
 * Note for future reference: `current_idx` isn't really used to update the current subsequence, but rather to just
 * hold the data.
 * `current_idx` is retrieved from `Data` when getSubsequence() is called, which defaults to 0 if it doesn't exist yet,
 * then is held until saveSequenceState() is called, which is whenever the Sequence changes.
 * This is preferable to just using `current_idx` to update because when a Sequence is initialized, `current_idx`
 * is always set to 0. This is usually fine, but if goToPrev is called at the start of one Sequence and the previous
 * Sequence contains subsequences, then the screen will result in showing the first of the subsequence.
 * TODO: Remove `current_idx` so that the only source of truth is held in Data. Rather than using `current_idx` as
 *  a temporary value, just update the variable in Data directly. Functionally, this shouldn't be any different,
 *  so this is somewhat low priority.
 */
class Sequence extends React.Component<ComponentProps<any>> {

  /**
   * The following fields may be implemented for use.
   * onKeyDown(key: string) => void
   *  If this function is defined, it will be called whenever a keyboard key is pressed.
   *  To define this, use
   *  `onKeyDown = (key: string) => { ... }`
   */
  current_subsequence?: any;
  current_idx: number;
  subsequence: Subsequence[];
  boundHandleKeyDown: (event: any) => void;
  onKeyDown?: (key: string) => void;

  constructor(props: Props) {
    super(props);
    this.subsequence = [];
    this.current_idx = 0;  // this is only used to save to this.props.data
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.loadStateData = this.loadStateData.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
  }

  /**
   * This function is called just before the sequence changes
   * Override to implement a functionality.
   */
  onGoToNext() {}

  /**
   * sequence: a subclass of Sequence
   * props: an object containing relevant properties
   * getProps: a function that returns additional props for dynamic/lazy loading
  */
  addSubsequence(sequence: ComponentClass<any>, props?: any, getProps?: () => any) {
    props = props === undefined ? {} : _.clone(props);
    if (!('key' in props)) {
      /* React doesn't always update when props change, but it does always update when a component with a different
         key needs to be rendered. By assigning a random key to all subsequences, this guarantees that React
         will always render the new screen. This is probably inefficient, but it produces more consistent behavior.
         In case a particular behavior is desired, this only applies when key is not defined already.
       */
      props['key'] = Math.random();
    }
    this.subsequence.push({ sequence, props, getProps });
  }

  /**
   * Dynamically creates the Sequence component.
   * This means that props are populated and the constructor() called at call time
   */
  getSubsequence() {
    this.current_idx = this.getCurrentSubsequenceIndex();
    const subsequence = this.subsequence[this.current_idx];
    let props = subsequence.props;
    if (subsequence.getProps !== undefined) {
      props = Object.assign(props, subsequence.getProps());
    }
    props['data'] = this.props.data;
    props['completedCallback'] = this.goToNext;
    props['goBackCallback'] = this.goToPrev;
    this.current_subsequence = React.createElement(subsequence.sequence, props);
  }

  getParams() {
    const params = {
      class: this.constructor.name,
      props: {...this.props}
    }
    delete params.props.data;
    delete params.props.completedCallback;
    return Object.freeze(params);
  }

  getSequenceKey() {
    return stringify(this.getParams());
  }

  /**
   Used to save current state of the Sequence so that it can be loaded back later.
   **/
  createStateData(): any {
    const data = {state: _.clone(this.state)}
    data['current_idx'] = this.current_idx;
    return data;
  }

  /**
   * Attempts to retrieve the current subsequence index from data if it exists.
   * If it doesn't exist, returns 0.
   * This is preferable to just
   */
  getCurrentSubsequenceIndex() {
    const data = this.props.data.loadSequenceState(this);
    if (data === null || data.current_idx < 0) {
      return 0;
    }
    if (data.current_idx >= this.subsequence.length) {
      return this.subsequence.length - 1;
    }
    return data.current_idx;
  }

  loadStateData() {
    const data = this.props.data.loadSequenceState(this);
    if (data !== null) {
      if ('state' in data) {
        this.setState(data.state);
      }
    }
  }

  goToPrev() {
    this.current_idx = Math.max(-1, this.current_idx - 1);
    this.props.data.saveSequenceState(this);

    if (this.current_idx < 0) {
      this.props.goBackCallback();
    } else {
      this.getSubsequence();
      this.forceUpdate();
    }
    window.scrollTo(0, 0);  // scroll to top
  }

  goToNext() {
    this.current_idx = Math.min(1 + this.current_idx, this.subsequence.length);
    this.props.data.saveSequenceState(this);

    if (this.current_idx == this.subsequence.length) {
      this.onGoToNext()
      this.props.completedCallback();
    } else {
      this.getSubsequence();
      this.forceUpdate();
    }
    window.scrollTo(0, 0);  // scroll to top
  }

  handleKeyDown(event: any) {
    let { key } = event;
    if (this.onKeyDown !== undefined) {
      this.onKeyDown(key);
    }
  }

  componentDidMount() {
    if (this.onKeyDown !== undefined) {
      document.addEventListener('keydown', this.boundHandleKeyDown);
    }
    this.loadStateData();
    this.props.data.sequenceTimestamps.push({timestamp: now(), sequence: this.getParams()});
  }

  componentWillUnmount() {
    if (this.onKeyDown !== undefined) {
      document.removeEventListener('keydown', this.boundHandleKeyDown);
    }
  }

  render() {
    // This is just to load the first subsequence.
    if (this.current_subsequence === undefined && this.subsequence.length > 0) {
      this.getSubsequence();
    }
    return (
      <div>
        {this.current_subsequence}
      </div>
    );
  }
}

export default Sequence;