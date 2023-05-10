import React, {ComponentProps, createRef, RefObject} from "react";
import {Layer, Stage} from "react-konva";
import Node from "./graph/Node"
import Edge, {Mode} from "./graph/Edge";
import Xmark from "./graph/Xmark";
import {getMidpoint} from "../misc/utils";
import Checkmark from "./graph/Checkmark";
const _ = require('lodash');

interface Props {
  width: number
  radius: number
  nodeA?: boolean
  nodeB?: boolean
  nodeC?: boolean

  edgeAB?: Mode
  edgeAC?: Mode
  edgeBC?: Mode

  edgeABActive?: boolean
  edgeACActive?: boolean
  edgeBCActive?: boolean

  enableNodeOnClick?: boolean
  enableEdgeOnClick?: boolean
  disableEdgeShadow?: boolean
}

export default class CausalGraphThree extends React.Component<ComponentProps<any>> {

  refEdgeAB: RefObject<Edge>;
  refEdgeAC: RefObject<Edge>;
  refEdgeBC: RefObject<Edge>;

  constructor(props: Props) {
    super(props);
    this.refEdgeAB = createRef();
    this.refEdgeAC = createRef();
    this.refEdgeBC = createRef();
  }

  getEdgeModes() {
    return {
      edgeAB: this.refEdgeAB.current!.state.mode,
      edgeAC: this.refEdgeAC.current!.state.mode,
      edgeBC: this.refEdgeBC.current!.state.mode
    }
  }

  render() {
    const length = this.props.width - 2*this.props.radius;
    const divHeight =  length * Math.sqrt(3)/2 + 2*this.props.radius;
    const nodeCenters = [
      [this.props.width/2, this.props.radius],
      [this.props.radius, divHeight - this.props.radius],
      [this.props.width - this.props.radius, divHeight - this.props.radius]
    ]
    const nodeLabels = ['A', 'B', 'C'];
    const nodeActive = [this.props.nodeA, this.props.nodeB, this.props.nodeC];
    const edgeLength = (this.props.width - 4 * this.props.radius) / this.props.width;
    const edgeWidth = .2 * this.props.radius;
    const edgeABCenter = getMidpoint(nodeCenters[0][0], nodeCenters[0][1], nodeCenters[1][0], nodeCenters[1][1]);
    const edgeACCenter = getMidpoint(nodeCenters[0][0], nodeCenters[0][1], nodeCenters[2][0], nodeCenters[2][1]);
    const edgeBCCenter = getMidpoint(nodeCenters[1][0], nodeCenters[1][1], nodeCenters[2][0], nodeCenters[2][1]);

    return (
      <span className={'causal-graph-three'} style={{display: "inline-block"}}>
      <Stage width={this.props.width} height={divHeight} >
        <Layer>
          <Edge
            point1={nodeCenters[0]}
            point2={nodeCenters[1]}
            length={edgeLength}
            width={edgeWidth}
            mode={this.props.edgeAB}
            enableOnClick={this.props.enableEdgeOnClick}
            disableShadow={this.props.disableEdgeShadow}
            ref={this.refEdgeAB}
          />
          <Edge
            point1={nodeCenters[0]}
            point2={nodeCenters[2]}
            length={edgeLength}
            width={edgeWidth}
            mode={this.props.edgeAC}
            enableOnClick={this.props.enableEdgeOnClick}
            disableShadow={this.props.disableEdgeShadow}
            ref={this.refEdgeAC}
          />
          <Edge
            point1={nodeCenters[1]}
            point2={nodeCenters[2]}
            length={edgeLength}
            width={edgeWidth}
            mode={this.props.edgeBC}
            enableOnClick={this.props.enableEdgeOnClick}
            disableShadow={this.props.disableEdgeShadow}
            ref={this.refEdgeBC}
          />

          {this.props.edgeABActive === true &&
              <Checkmark x={edgeABCenter[0]} y={edgeABCenter[1]} size={35*edgeLength} color={'limegreen'}/>}
          {this.props.edgeACActive === true &&
              <Checkmark x={edgeACCenter[0]} y={edgeACCenter[1]} size={35*edgeLength} color={'limegreen'}/>}
          {this.props.edgeBCActive === true &&
              <Checkmark x={edgeBCCenter[0]} y={edgeBCCenter[1]} size={35*edgeLength} color={'limegreen'}/>}
          {this.props.edgeABActive === false &&
              <Xmark x={edgeABCenter[0]} y={edgeABCenter[1]} size={35*edgeLength} color={'red'}/>}
          {this.props.edgeACActive === false &&
              <Xmark x={edgeACCenter[0]} y={edgeACCenter[1]} size={35*edgeLength} color={'red'}/>}
          {this.props.edgeBCActive === false &&
              <Xmark x={edgeBCCenter[0]} y={edgeBCCenter[1]} size={35*edgeLength} color={'red'}/>}

          {_.map([0, 1, 2], (i: number) =>
            (<Node
              x={nodeCenters[i][0]}
              y={nodeCenters[i][1]}
              radius={this.props.radius}
              label={nodeLabels[i]}
              active={nodeActive[i]}
              enableOnClick={this.props.enableNodeOnClick}
              key={`node${i}`}
            />))}
        </Layer>
      </Stage>
    </span>)
  }
}