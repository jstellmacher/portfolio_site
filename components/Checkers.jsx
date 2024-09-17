import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FaInfoCircle } from 'react-icons/fa';

// Piece component
const Piece = ({ color, position }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'piece',
    item: { color, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        backgroundColor: color,
      }}
    />
  );
};

// Square component
const Square = ({ color, position, piece, movePiece }) => {
  const [, drop] = useDrop(() => ({
    accept: 'piece',
    drop: (item) => movePiece(item.position, position),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '12.5%',
        height: '12.5%',
        backgroundColor: color,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {piece && <Piece color={piece} position={position} />}
    </div>
  );
};

// Board component
const Board = () => {
  const [pieces, setPieces] = useState({
    '0,1': 'red', '0,3': 'red', '0,5': 'red', '0,7': 'red',
    '1,0': 'red', '1,2': 'red', '1,4': 'red', '1,6': 'red',
    '2,1': 'red', '2,3': 'red', '2,5': 'red', '2,7': 'red',
    '5,0': 'black', '5,2': 'black', '5,4': 'black', '5,6': 'black',
    '6,1': 'black', '6,3': 'black', '6,5': 'black', '6,7': 'black',
    '7,0': 'black', '7,2': 'black', '7,4': 'black', '7,6': 'black',
  });

  const movePiece = (from, to) => {
    setPieces(prev => {
      const newPieces = { ...prev };
      newPieces[to] = newPieces[from];
      delete newPieces[from];
      return newPieces;
    });
  };

  const squares = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const color = (i + j) % 2 === 0 ? 'white' : 'gray';
      const position = `${i},${j}`;
      squares.push(
        <Square
          key={position}
          color={color}
          position={position}
          piece={pieces[position]}
          movePiece={movePiece}
        />
      );
    }
  }

  return (
    <div style={{
      width: '400px',
      height: '400px',
      display: 'flex',
      flexWrap: 'wrap',
      border: '1px solid black',
    }}>
      {squares}
    </div>
  );
};

// Main Checkers component
const Checkers = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Checkers Game</h1>
        <div className="mb-4 p-4 bg-yellow-100 rounded-lg">
          <p className="text-sm text-gray-700 flex items-start">
            <FaInfoCircle className="text-yellow-500 mr-2 mt-1 flex-shrink-0" />
            <span>
            It doesn&apos;t include all the rules (like capturing pieces or king pieces).
            The game will be updated eventually to add more game logic, turn-based play, and other features to make it a complete checkers game.
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <Board />
        </div>
      </div>
    </DndProvider>
  );
};

export default Checkers;