import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const IngredientTypes = {
  BUN_TOP: 'BUN_TOP',
  LETTUCE: 'LETTUCE',
  TOMATO: 'TOMATO',
  MYSTERY_MEAT: 'MYSTERY_MEAT',
  BUN_BOTTOM: 'BUN_BOTTOM',
};

const correctOrder = [
  IngredientTypes.BUN_TOP,
  IngredientTypes.LETTUCE,
  IngredientTypes.TOMATO,
  IngredientTypes.MYSTERY_MEAT,
  IngredientTypes.BUN_BOTTOM,
];

const Ingredient = ({ type, position, isDraggable, onDrag }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: isDraggable ? 'PLACED_INGREDIENT' : type,
    item: { type, initialPosition: position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    drag: (item, monitor) => {
      if (isDraggable && onDrag) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const x = Math.round(item.initialPosition.x + delta.x);
        const y = item.initialPosition.y;
        onDrag(type, { x, y });
      }
    },
  }), [type, position, isDraggable, onDrag]);

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: isDraggable ? 'move' : 'grab',
    width: '120px',
    height: '30px',
    borderRadius: '15px',
    backgroundColor: getColor(type),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#000',
    position: position ? 'absolute' : 'static',
    left: position ? `${position.x}px` : 'auto',
    top: position ? `${position.y}px` : 'auto',
    margin: position ? '0' : '5px',
  };

  return <div ref={drag} style={style}>{type}</div>;
};

const DropSlot = ({ index, patty, setPatty }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [...Object.values(IngredientTypes), 'PLACED_INGREDIENT'],
    drop: (item, monitor) => {
      const dropRect = monitor.getClientOffset();
      const containerRect = document.getElementById('drop-container').getBoundingClientRect();
      const x = Math.round(dropRect.x - containerRect.left);
      const y = index * 40;
      
      setPatty((prev) => {
        const newPatty = [...prev];
        if (item.initialPosition) {
          // Moving an already placed ingredient
          const oldIndex = prev.findIndex(ing => ing && ing.type === item.type);
          if (oldIndex !== -1) {
            newPatty[oldIndex] = null;
          }
        }
        newPatty[index] = { type: item.type, position: { x, y } };
        return newPatty;
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [index]);

  const style = {
    height: '40px',
    border: '1px dashed #ccc',
    backgroundColor: isOver ? '#f0f0f0' : 'transparent',
  };

  return <div ref={drop} style={style} />;
};

const PattyAssembly = () => {
  const [patty, setPatty] = useState(Array(5).fill(null));
  const [message, setMessage] = useState('');

  const handleDrag = (type, newPosition) => {
    setPatty(prev => prev.map(ing => 
      ing && ing.type === type ? { ...ing, position: newPosition } : ing
    ));
  };

  useEffect(() => {
    const isCorrectOrder = patty.every((ingredient, index) => 
      ingredient && ingredient.type === correctOrder[index]
    );
    const isAligned = patty.every((ingredient) => 
      ingredient && Math.abs(ingredient.position.x - 40) < 10
    );
    const isComplete = patty.every((ingredient) => ingredient !== null);

    if (isComplete) {
      if (isCorrectOrder && isAligned) {
        setMessage("You made the perfect Crabby Patty - Squidward is happy!");
      } else {
        setMessage("Squidward is sick of you coming to work!");
      }
    } else {
      setMessage('');
    }
  }, [patty]);

  return (
    <div>
      <div id="drop-container" style={{ width: '200px', height: '200px', border: '2px solid #000', position: 'relative' }}>
        {correctOrder.map((_, index) => (
          <DropSlot key={index} index={index} patty={patty} setPatty={setPatty} />
        ))}
        {patty.map((ingredient, index) => 
          ingredient && (
            <Ingredient 
              key={index} 
              type={ingredient.type} 
              position={ingredient.position}
              isDraggable={true}
              onDrag={handleDrag}
            />
          )
        )}
      </div>
      {message && <p style={{ color: message.includes('happy') ? 'green' : 'red', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
};

const CrabbyPatty = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', fontSize: '16px', color: '#000' }}>
        <div style={{ marginRight: '20px' }}>
          <h3>Ingredients:</h3>
          {Object.values(IngredientTypes).map(type => (
            <Ingredient key={type} type={type} isDraggable={false} />
          ))}
        </div>
        <div>
          <h3>Assemble your Crabby Patty:</h3>
          <PattyAssembly />
        </div>
        <div style={{
          backgroundColor: 'yellow',
          padding: '10px',
          marginLeft: '20px',
          color: 'black',
          fontWeight: 'bold',
          alignSelf: 'flex-start'
        }}>
          <p>
            First attempt at building a react app with dnd. It is very frustrating.
          </p>
        </div>
      </div>
    </DndProvider>
  );
};

function getColor(type) {
  switch (type) {
    case IngredientTypes.BUN_TOP:
    case IngredientTypes.BUN_BOTTOM:
      return '#F4A460';
    case IngredientTypes.LETTUCE:
      return '#90EE90';
    case IngredientTypes.TOMATO:
      return '#FF6347';
    case IngredientTypes.MYSTERY_MEAT:
      return '#8B4513';
    default:
      return '#ccc';
  }
}

export default CrabbyPatty;
