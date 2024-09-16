import React, { useState, useRef, useEffect } from 'react';
import { 
  RiDivideLine, 
  RiAddLine, 
  RiSubtractLine, 
  RiCloseLine,
  RiPercentLine,
  RiEqualLine,
  RiArrowLeftRightLine
} from 'react-icons/ri';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const displayRef = useRef(null);

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [equation, display]);

  const handleNumberClick = (number) => {
    if (display === '0' || resetDisplay) {
      setDisplay(number);
      setEquation(prev => prev + number);
      setResetDisplay(false);
    } else {
      setDisplay(prev => prev + number);
      setEquation(prev => prev + number);
    }
  };

  const handleOperationClick = (op) => {
    if (previousValue === null) {
      setPreviousValue(parseFloat(display));
      setEquation(prev => prev + ' ' + op + ' ');
    } else if (operation) {
      const result = performOperation(previousValue, parseFloat(display), operation);
      setPreviousValue(result);
      setDisplay(result.toString());
      setEquation(prev => `${prev} = ${result} ${op} `);
    }
    setOperation(op);
    setResetDisplay(true);
  };

  const handleEqualsClick = () => {
    if (previousValue !== null && operation) {
      const result = performOperation(previousValue, parseFloat(display), operation);
      setDisplay(result.toString());
      setEquation(prev => `${prev} = ${result}`);
      setPreviousValue(null);
      setOperation(null);
      setResetDisplay(true);
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setEquation('');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const performOperation = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const Button = ({ children, onClick, className }) => (
    <button
      className={`w-full h-16 text-2xl font-bold rounded-full focus:outline-none flex items-center justify-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div className="w-full max-w-xs mx-auto bg-black p-4 rounded-3xl">
      <div className="mb-4 text-right h-24 flex flex-col justify-end">
        <div 
          ref={displayRef}
          className="text-white text-3xl font-light truncate overflow-x-auto whitespace-nowrap"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {equation || display}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Button onClick={handleClearClick} className="bg-gray-300 text-black">
          {equation === '' ? 'AC' : 'C'}
        </Button>
        <Button onClick={() => {}} className="bg-gray-300 text-black">
          <RiArrowLeftRightLine />
        </Button>
        <Button onClick={() => {}} className="bg-gray-300 text-black">
          <RiPercentLine />
        </Button>
        <Button onClick={() => handleOperationClick('÷')} className="bg-orange-500 text-white">
          <RiDivideLine />
        </Button>

        <Button onClick={() => handleNumberClick('7')} className="bg-gray-700 text-white">7</Button>
        <Button onClick={() => handleNumberClick('8')} className="bg-gray-700 text-white">8</Button>
        <Button onClick={() => handleNumberClick('9')} className="bg-gray-700 text-white">9</Button>
        <Button onClick={() => handleOperationClick('×')} className="bg-orange-500 text-white">
          <RiCloseLine />
        </Button>

        <Button onClick={() => handleNumberClick('4')} className="bg-gray-700 text-white">4</Button>
        <Button onClick={() => handleNumberClick('5')} className="bg-gray-700 text-white">5</Button>
        <Button onClick={() => handleNumberClick('6')} className="bg-gray-700 text-white">6</Button>
        <Button onClick={() => handleOperationClick('-')} className="bg-orange-500 text-white">
          <RiSubtractLine />
        </Button>

        <Button onClick={() => handleNumberClick('1')} className="bg-gray-700 text-white">1</Button>
        <Button onClick={() => handleNumberClick('2')} className="bg-gray-700 text-white">2</Button>
        <Button onClick={() => handleNumberClick('3')} className="bg-gray-700 text-white">3</Button>
        <Button onClick={() => handleOperationClick('+')} className="bg-orange-500 text-white">
          <RiAddLine />
        </Button>

        <Button onClick={() => handleNumberClick('0')} className="col-span-2 bg-gray-700 text-white">0</Button>
        <Button onClick={() => handleNumberClick('.')} className="bg-gray-700 text-white">.</Button>
        <Button onClick={handleEqualsClick} className="bg-orange-500 text-white">
          <RiEqualLine />
        </Button>
      </div>
    </div>
  );
};

export default Calculator;
