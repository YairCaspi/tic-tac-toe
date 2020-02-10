import React, { Component } from 'react';

class Header extends Component {
  render() {
    const turnText = this.props.turnX ? 'X' : 'O';
    const turnTitle = `${turnText} turn`;
    return (
      <div>
        <button onClick={this.props.clickNewGame}>new game</button>
        <button onClick={this.props.clickUndo}>undo</button><br/>
        <h2>{turnTitle}</h2>
      </div>
    );
  }
}

export default Header;
