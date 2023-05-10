import React, {ComponentProps} from "react";
import {RadioButton} from "primereact/radiobutton";
import {Checkbox, CheckboxChangeParams} from "primereact/checkbox";
const _ = require('lodash');

/**
 * A component for managing select-from questions.
 */

export default class SelectQuestion extends React.Component<ComponentProps<any>> {

  props: {
    question: string
    options: string[]
    selected?: null | string | string[]
    onChange: (value: string | string[]) => void
    questionWidth: number
    multiSelect?: boolean
  }

  options: { name: string, key: string }[];

  constructor(props: any) {
    super(props);
    this.options = _.map(props.options, (o: string) => ({name: o, key: o}));
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
  }

  onCheckboxChange(e: CheckboxChangeParams) {
    let selected = [...this.props.selected as string[]];
    //
    if (e.checked) {
      selected.push(e.value.key);
    }
    else {
      for (let i = 0; i < selected.length; i++) {
        const selectedCategory = selected[i];

        if (selectedCategory === e.value.key) {
          selected.splice(i, 1);
          break;
        }
      }
    }
    this.props.onChange(selected);
  }

  render() {
    let selected;
    if (this.props.selected === undefined || this.props.selected === null) {
      selected = this.props.multiSelect ? [] : "";
    } else {
      selected = this.props.selected;
    }

    return (
      <div className="grid" style={{textAlign: "left"}}>
        <div className="col-fixed"
             style={{width: this.props.questionWidth, paddingTop: "0.25rem"}}>
          {this.props.question}
        </div>
        <div className="col">
          <div className="grid">
            {_.map(this.options, (option: any, idx: number) => (
              <div className="col-6" style={{padding: "0.25rem"}} key={`${this.props.question}_option${idx}`}>
                {this.props.multiSelect
                  ? <Checkbox
                    inputId={`${this.props.question}_option${idx}`}
                    value={option}
                    onChange={this.onCheckboxChange}
                    checked={selected.includes(option.key)} />
                  : <RadioButton
                    inputId={`${this.props.question}_option${idx}`}
                    name="option"
                    value={option}
                    onChange={(e) => this.props.onChange(e.value.key)}
                    checked={selected === option.key} />
                }
                <label htmlFor={`${this.props.question}_option${idx}`} style={{paddingLeft: 4}}>{option.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}


