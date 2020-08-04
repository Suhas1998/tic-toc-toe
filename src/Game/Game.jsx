import React, { Component } from "react";
import "./Game.css"
import GameRoom from './GameRoom'

class Game extends Component {
    constructor(props){
        super(props)
        this.state = {
            board: Array(9).fill(null),
            player1: "",
            player2: "",
            winner: null,
            roomId: null,
            myShape: null, //Check from who starts
            myTurn: null, //Check from user id
            gameStatus: 0 //0:No opponent, 1:Match Menu, 2:My Turn, 3:Opponent TUrn, 4:Game Ends
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
                alert('Game Ends');
                this.setState({
                    winner: this.state.player
                })
            }
        }
    };

    handleClick = (index) => {
        console.log("Board Click")
        let newBoard = this.state.board
        if (this.state.board[index] === null && !this.state.winner){
            newBoard[index] = this.state.player

            this.setState({
                board: newBoard,
                player: this.state.player === "X" ? "O" : "X"
            })

            this.checkWinner()
        }        
    };

    newBoard = () =>{
        console.log("claearing Board")
        this.setState({
            board : Array(9).fill(null),
            player : "X",
            winner : null
        })
    };



    changeState = (data) => {
        this.setState({
            
        })
    }

    render(){

        const childStateHandler = data => this.changeState(data)

        const cell = this.state.board.map((cell, index) => <div className="cell" key= {index} onClick={(e) => this.handleClick(index)}>{cell}</div>)
        
        return (
            <>
                
                <h1>{}</h1>
                <div className="container">
                    <div className="card border-dark ">
                        <div className="card-header">Tic Tac Toe</div>
                        <div className="card-body text-dark">
                            <h5 className="card-title">Player 1 Vs Player 2</h5>
                            <div id="game-board" className="board">
                                {cell}
                            </div>
                        </div>
                        <div className="card-footer btn-toolbar">
                            <GameRoom onChange={childStateHandler}></GameRoom>
                            <button id="new-game-btn" className="btn btn-primary" onClick={ (e) => this.newBoard() }>New Board</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Game;