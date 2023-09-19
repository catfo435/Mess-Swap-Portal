import React, { Component } from 'react'

type MessButtonProps = {
  id:string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default class MessButton extends Component<MessButtonProps> {

  render() {
    return (
      <>
      <h4>Select your mess</h4>
      <form>
      <label>Mess 1</label>
      <input style={{display:'inline'}} id={this.props.id} name='mess' type="radio" value="1" onChange={this.props.onChange}/>
      <label>Mess 2</label>
      <input style={{display:'inline'}} id={this.props.id} name='mess' type="radio" value="2" onChange={this.props.onChange}/>
      <label>Mess 3</label>
      <input style={{display:'inline'}} id={this.props.id} name='mess' type="radio" value="3" onChange={this.props.onChange}/>
      <label>Mess 4</label>
      <input style={{display:'inline'}} id={this.props.id} name='mess' type="radio" value="4" onChange={this.props.onChange}/>
      </form>
      </>
    )
  }
}
