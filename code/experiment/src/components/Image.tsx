import React, {ComponentProps} from "react";
import './Image.css';


interface Props {
  filepath: string,
  width?: number,
  height?: number,
  caption?: string
}

class Image extends React.Component<ComponentProps<any>> {

  filepath: string;

  constructor(props: Props) {
    super(props);
    this.filepath = process.env.PUBLIC_URL + props.filepath;
  }

  render() {
    return (<span className={'image'}>
      <img src={this.filepath} width={this.props.width} height={this.props.height} />
      {this.props.caption !== undefined &&
        <span className={'caption'}>
          {this.props.caption}
        </span>
      }
    </span>)
  }
}

export default Image;