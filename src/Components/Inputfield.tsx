import React, { Component } from 'react'

type InputfieldProps = {
  id:string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  label:string,
  value:string,
  disabled?:boolean
}

export default class Inputfield extends Component<InputfieldProps> {

  render() {
    return (
      <label>{this.props.label}<br></br><br></br>
        <input id={this.props.id} type="text" placeholder='' disabled={this.props.disabled} value={this.props.value} onChange={this.props.onChange}/>
      </label>
    )
  }
}
