import React, {ComponentProps} from "react";
import {Group, Arrow, Line} from "react-konva";


interface Props {
  point1: number[],
  point2: number[],
  length: number,
  width: number,
  mode?: Mode,
  enableOnClick?: boolean
}

export enum Mode {
  None = 'none',
  Forward = 'forward',
  Backward = 'backward'
}

export default class Edge extends React.Component<ComponentProps<any>> {

  state: {
    mode: Mode
    opacity1: number
    opacity2: number
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      mode: props.mode ? props.mode : Mode.None,
      opacity1: this.props.enableOnClick ? .1 : 0,
      opacity2: this.props.enableOnClick ? .1 : 0
    };
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onClick(closerTo1: boolean) {
    if (this.props.enableOnClick) {
      let mode = Mode.None;
      if (closerTo1 && this.state.mode !== Mode.Backward) {
        mode = Mode.Backward
      }
      else if (!closerTo1 && this.state.mode !== Mode.Forward) {
        mode = Mode.Forward
      }
      this.setState({mode: mode});
    }
  }

  onMouseEnter(closerTo1: boolean) {
    if (this.props.enableOnClick) {
      if (closerTo1) {
        this.setState({ opacity1: .3 });
      } else {
        this.setState({ opacity2: .3 });
      }
    }
  }

  onMouseLeave() {
    if (this.props.enableOnClick) {
      this.setState({
        opacity1: .1,
        opacity2: .1
      })
    }
  }

  render() {
    const point1 = this.state.mode === Mode.Forward ? this.props.point1 : this.props.point2;
    const point2 = this.state.mode === Mode.Forward ? this.props.point2 : this.props.point1;
    const midPoint = [
      (this.props.point1[0] + this.props.point2[0])/2,
      (this.props.point1[1] + this.props.point2[1])/2
    ];

    let x2 = point2[0] - point1[0];
    let y2 = point2[1] - point1[1];

    // apply length scaling
    let x1 = point1[0] + .5 * (1 - this.props.length) * x2;
    let y1 = point1[1] + .5 * (1 - this.props.length) * y2;
    x2 = this.props.length * x2;
    y2 = this.props.length * y2;

    return (
      <Group>
        <Arrow
          x={x1}
          y={y1}
          points={[0, 0, x2, y2]}
          pointerLength={this.props.width}
          pointerWidth={this.props.width}
          fill={'black'}
          stroke={'black'}
          strokeWidth={this.props.width}
          opacity={this.state.mode === Mode.None ? 0 : 1}
        />
        <Line
          points={[this.props.point1[0], this.props.point1[1], midPoint[0], midPoint[1]]}
          stroke={'black'}
          opacity={this.state.opacity1}
          strokeWidth={3*this.props.width}
          onClick={() => this.onClick(true)}
          onMouseEnter={() => this.onMouseEnter(true)}
          onMouseLeave={this.onMouseLeave}
        />
        <Line
          points={[midPoint[0], midPoint[1], this.props.point2[0], this.props.point2[1]]}
          stroke={'black'}
          opacity={this.state.opacity2}
          strokeWidth={3*this.props.width}
          onClick={() => this.onClick(false)}
          onMouseEnter={() => this.onMouseEnter(false)}
          onMouseLeave={this.onMouseLeave}
        />
      </Group>
    )
  }
}