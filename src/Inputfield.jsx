import React, { Component } from 'react'

export default class Inputfield extends Component {

  render() {
    return (
      <label>{this.props.label}
        <input id={this.props.id} type="text" disabled={this.props.disabled} value={this.props.value} onChange={this.props.onChange}/>
      </label>
    )
  }
}
