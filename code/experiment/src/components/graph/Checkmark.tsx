import React, {ComponentProps} from "react";
import {Line, Group} from "react-konva";

export default class Checkmark extends React.Component<ComponentProps<any>> {

  props: {
    x: number
    y: number
    size: number
    color: string
  }

  render() {
    return (
      <Group>
        <Line
          points={[this.props.x + this.props.size,
            this.props.y - this.props.size,
            this.props.x - this.props.size/4,
            this.props.y + this.props.size,
            this.props.x - this.props.size,
            this.props.y
          ]}
          stroke={this.props.color}
          strokeWidth={this.props.size / 2}
        />
      </Group>

    )
  }
}