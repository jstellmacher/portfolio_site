import React, { useState, useRef } from 'react';
import Editor from 'react-simple-code-editor';
import { Highlight, themes } from 'prism-react-renderer';
import { FaPlay, FaUndo, FaInfoCircle } from 'react-icons/fa';

/* eslint-disable react/jsx-key */
const JSCodeEditor = () => {
  const [code, setCode] = useState(
    '// Write your JavaScript code here\nconsole.log("Hello, World!");\nconsole.log("This is a test");'
  );
  const [output, setOutput] = useState('');
  const [showLimitations, setShowLimitations] = useState(false);
  const originalConsoleLog = useRef(console.log);

  const runCode = () => {
    let outputBuffer = [];
    // Override console.log to capture output
    console.log = (...args) => {
      outputBuffer.push(args.map(arg => String(arg)).join(' '));
    };

    try {
      // Wrap the code in an async function to allow for async operations
      const asyncFunction = new Function('return (async () => { ' + code + ' })()')
      asyncFunction().then(() => {
        setOutput(outputBuffer.join('\n'));
      }).catch(error => {
        setOutput(`Error: ${error.message}`);
      }).finally(() => {
        // Restore the original console.log
        console.log = originalConsoleLog.current;
      });
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      // Restore the original console.log
      console.log = originalConsoleLog.current;
    }
  };

  const resetCode = () => {
    setCode('// Write your JavaScript code here\nconsole.log("Hello, World!");\nconsole.log("This is a test");');
    setOutput('');
  };

  const toggleLimitations = () => {
    setShowLimitations(!showLimitations);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">JS Code Editor</h1>
      <div className="mb-4 border rounded-lg overflow-hidden bg-white">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => (
            <Highlight theme={themes.vscodeDark} code={code} language="javascript">
              {({ tokens, getLineProps, getTokenProps }) => (
                <>
                  {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: i })}>
                      {line.split('').map((char, charIndex) => (
                        <span key={`${i}-${charIndex}`} style={{ ...getTokenProps({ token: char, key: charIndex }) }}>
                          {char}
                        </span>
                      ))}
                    </div>
                  ))}
                </>
              )}
            </Highlight>
          )}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
          className="min-h-[200px]"
        />
      </div>
      <div className="flex justify-between mb-4">
        <button
          onClick={runCode}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300 flex items-center"
        >
          <FaPlay className="mr-2" /> Run Code
        </button>
        <button
          onClick={resetCode}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300 flex items-center"
        >
          <FaUndo className="mr-2" /> Reset
        </button>
        <button
          onClick={toggleLimitations}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 flex items-center"
        >
          <FaInfoCircle className="mr-2" /> {showLimitations ? 'Hide Limitations' : 'Show Limitations'}
        </button>
      </div>
      {showLimitations && (
        <div className="mb-4 p-4 bg-yellow-50 rounded-lg text-sm text-gray-800 border border-yellow-200">
          <h3 className="font-bold mb-2">Limitations:</h3>
          <ul className="list-disc list-inside">
            <li>Code execution happens in the browser's context, so it can't access Node.js-specific features.</li>
            <li>For security reasons, it doesn't have access to browser APIs that might be considered sensitive.</li>
            <li>Infinite loops or very long-running code might freeze the browser tab.</li>
            <li>Only console.log outputs are captured and displayed.</li>
          </ul>
          <p className="mt-2">Despite these limitations, it's a great tool for learning and quick experimentation with JavaScript.</p>
        </div>
      )}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Output:</h2>
        <pre className="bg-white p-4 rounded-lg whitespace-pre-wrap text-gray-800 border border-gray-200">
          {output}
        </pre>
      </div>
    </div>
  );
};

export default JSCodeEditor;

