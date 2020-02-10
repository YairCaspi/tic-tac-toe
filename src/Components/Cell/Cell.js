import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

  onCellClick = () => {
    const { id, cellClick } = this.props;
    cellClick(id);
  }

  render() {
    const { value } = this.props;
  return (
    <button
      className='cell'
      onClick={this.onCellClick}
      disabled={value != "" || this.props.disabled}>
        {this.props.value}
    </button>);
  }
}

export default Cell;
