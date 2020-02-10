import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Cell, Header } from '../../Components';

import 'react-toastify/dist/ReactToastify.css';
import './Board.css';

const GAME_STATUS = {
  PLAY: 0,
  NO_WIN:1,
  X_WIN: 2,
  O_WIN: 3,
}

const MAX_MOVES = 9;
const initialState = {
  cells: [Array(9).fill('')],
  turnX: true,
  movesNumber: 0,
  gameStatus: GAME_STATUS.PLAY
}

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = initialState;

    this.winStates = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
  }

  handleNewGameClick = () => {
    this.setState(initialState);
  }
  
  handleUndoClick = () => {
    let cellsHistory = Object.assign([], this.state.cells);
    cellsHistory.pop();

    this.setState({
      cells: cellsHistory,
      movesNumber: this.state.movesNumber - 1,
      turnX: !this.state.turnX,
      gameStatus: GAME_STATUS.PLAY
    });
  }

  handleCellClick = (id) => {
    const cellTurn = this.state.turnX ? 'X' : 'O';
    let cells = Object.assign([], this.state.cells[this.state.movesNumber]);
    let cellsHistory = Object.assign([], this.state.cells);
    let newGameStatus = GAME_STATUS.PLAY;
    const newMovesNumber = this.state.movesNumber + 1;

    cells[id] = cellTurn;
    cellsHistory.push(cells);
    const isWin = this.checkWin(cells, cellTurn);
    if (isWin) {
      newGameStatus = (this.state.turnX) ? GAME_STATUS.X_WIN : GAME_STATUS.O_WIN;
      this.showWinningMessage(true, newGameStatus);
    } else if (newMovesNumber == MAX_MOVES) {
      newGameStatus = GAME_STATUS.NO_WIN;
      this.showWinningMessage(false, newGameStatus);
    }

    this.setState({
      cells: cellsHistory,
      turnX: !this.state.turnX,
      movesNumber: newMovesNumber,
      gameStatus: newGameStatus
    });
  }

  checkWin = (boardCells, turn) => {
    for (let index = 0; index < this.winStates.length; index++) {
      const element = this.winStates[index];
      if (
        boardCells[element[0]] === turn &&
        boardCells[element[1]] === turn &&
        boardCells[element[2]] === turn) {
          return true;
      }
    }
    return false;
  }

  showWinningMessage = (hasWinner, gameStatus) => {
    let toastType;
    let message;
    if (hasWinner) {
      const winner = (gameStatus === GAME_STATUS.X_WIN) ? 'X' : 'O';
      message = `The ${winner} Won!`;
      toastType = toast.TYPE.SUCCESS;
    } else {
      message = 'Game Over';
      toastType = toast.TYPE.INFO;
    }
    toast(message, { type: toastType });
  }

  render() {
    const { cells, movesNumber } = this.state;
    const allCells = cells[movesNumber].map((cell, index) => {
    return (
      <Cell 
        key={index}
        id={index}
        value={cells[movesNumber][index]}
        cellClick={this.handleCellClick}
        disabled={this.state.gameStatus != GAME_STATUS.PLAY}
      />
    )}
  );
    return (
      <div>
        <Header
          clickNewGame={this.handleNewGameClick}
          clickUndo={this.handleUndoClick}
          turnX={this.state.turnX}
        />
        <div className='board'>
          {allCells}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default Board;
