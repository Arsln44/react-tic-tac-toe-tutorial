import { useState } from "react";
import "./App.css";

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        setSquares(nextSquares);
        setXIsNext(!xIsNext);
    }
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }
    return (
        <>
            <div className="status">{status}</div>
            {
                [0,1,2].map((rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {[0,1,2].map((colIndex) => {
                            const squareIndex = rowIndex * 3 + colIndex;
                            return(
                                <Square
                                    key={squareIndex}
                                    value={squares[squareIndex]}
                                    onSquareClick={() => handleClick(squareIndex)}
                                />
                            )
                        })}
                    </div>
                ))
            }
        </>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
