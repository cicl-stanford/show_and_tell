import React, {ComponentProps} from "react";
import {Circle, Group, Text} from "react-konva";

interface Props {
  x: number
  y: number
  radius: number
  label: string
  active?: boolean
  enableOnClick?: boolean
}

export default class Node extends React.Component<ComponentProps<any>> {

  state: {
    active: boolean
  }

  constructor(props: Props) {
    super(props);
    this.state = { active: !!props.active };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.enableOnClick) {
      this.setState({active: !this.state.active});
    }
  }

  render() {
    const fontSize = this.props.radius * .75;
    return (
      <Group>
        <Circle
          x={this.props.x}
          y={this.props.y}
          radius={.97 * this.props.radius}
          stroke={'black'}
          strokeWidth={.06 * this.props.radius}
          fill={ this.state.active ? "yellow" : "#E5E5E5"}
          onClick={this.onClick}
        />
        <Text
          text={this.props.label}
          x={this.props.x - this.props.radius/2}
          y={this.props.y - this.props.radius/2}
          width={this.props.radius}
          height={this.props.radius}
          fontSize={fontSize}
          fontStyle={'bold'}
          align={'center'}
          verticalAlign={'middle'}
          onClick={this.onClick}
        />

      </Group>

    )
  }
}