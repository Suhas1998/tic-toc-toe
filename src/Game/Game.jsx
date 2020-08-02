import React, { Component } from "react";
import "./Game.css"

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            board : Array(9).fill(null),
            player : "X",
            winner : null
        }
    }
    
    checkWinner(){
        let winLines = [
            ["0", "1", "2"],
            ["3", "4", "5"],
            ["6", "7", "8"],
            ["0", "3", "6"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["0", "4", "8"],
            ["2", "4", "6"]
        ]

        for (let index = 0; index <winLines.length;index++){
            const [a,b,c] = winLines[index];
            if( this.state.board[a] && this.state.board[a] === this.state.board[b] && this.state.board[b] === this.state.board[c] ){
                alert('You Won');
                this.setState({
                    winner: this.state.player
                })
            }
        }
    }
    handleClick(index){
        let newBoard = this.state.board
        if (this.state.board[index] === null && !this.state.winner){
            newBoard[index] = this.state.player

            this.setState({
                board: newBoard,
                player: this.state.player === "X" ? "O" : "X"
            })

            this.checkWinner()
        }        
    }

    render(){

        const cell = this.state.board.map((cell, index) => <div className="cell" key= {index} onClick={(e) => this.handleClick(index)}>{cell}</div>)
        
        return (
            <div className="container">
                <div className="row">
                    <div className=" col-12 align-self-center">
                        <div class="card border-dark ">
                            <div class="card-header">Tic Tac Toe</div>
                            <div class="card-body text-dark">
                                <h5 class="card-title">Player 1 Vs Player 2</h5>
                                <div id="game-board" className="board">
                                    {cell}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Game;