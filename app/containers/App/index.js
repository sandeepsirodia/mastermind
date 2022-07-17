/**
 *
 * App
 *
 */

import React, { useEffect, useReducer, useState } from 'react';
import SelectBall from 'components/SelectBall';
import Rows from 'containers/Rows';
import { Modal, Button } from 'antd';
import { ALL_BALLS } from 'utils/constants';
import { generateRandomNumberByLength } from 'utils/functions';
import { reducer, initialState } from './reducer';

import './style.css';

function App() {
  const [selectedBall, updateBall] = useState('');
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    responses,
    solution,
    activeRowIndex,
    correctSolution,
    showRowCheckButton,
    showModal,
  } = state;

  const getRandomBalls = () => ALL_BALLS[generateRandomNumberByLength(5.99)];

  /**
   *
   * @returns new game solution with 4 different balls in a Array
   */
  const generateSolution = () => [
    getRandomBalls(),
    getRandomBalls(),
    getRandomBalls(),
    getRandomBalls(),
  ];

  const updateNewSolution = () => {
    dispatch({
      type: 'updateNewSolution',
      payload: generateSolution(),
    });
  };

  useEffect(() => {
    console.log('solution to check success state', solution);
  }, [solution]);

  useEffect(() => {
    updateNewSolution();
  }, []);

  /**
   *
   * @param {*} rowIndex is the index of a row
   * @param {*} ballIndex is index of the ball in a row
   */
  const updateResponses = (rowIndex, ballIndex) => {
    const newResponses = [...responses];
    let newShowRowCheckButton;
    newResponses[rowIndex].response[ballIndex] = selectedBall;
    if (
      !newResponses[rowIndex].response.some(responseBall => responseBall === '')
    ) {
      newShowRowCheckButton = rowIndex;
    } else if (showRowCheckButton) {
      newShowRowCheckButton = undefined;
    }

    dispatch({
      type: 'updateResponses',
      payload: {
        responses: newResponses,
        showRowCheckButton: newShowRowCheckButton,
      },
    });
  };

  /**
   * This function will be called when user has filled all the four places
   */
  const handleRowCheck = () => {
    let countOfBallInSolution = 0;
    let countOfBallAtCorrectPlace = 0;
    let countOfWrongBall = 0;

    solution.forEach((correctBall, index) => {
      if (responses[activeRowIndex].response.includes(correctBall)) {
        if (correctBall === responses[activeRowIndex].response[index]) {
          countOfBallAtCorrectPlace += 1;
        } else {
          countOfBallInSolution += 1;
        }
      } else {
        countOfWrongBall += 1;
      }
    });

    const newResponses = [...responses];
    let isCorrectResponse = false;

    const rowSuggestions = [];
    const updateSuggestions = (type, multiplier) => {
      for (let index = 0; index < multiplier; index += 1) {
        rowSuggestions.push(type);
      }
    };

    if (countOfBallAtCorrectPlace === 4) {
      isCorrectResponse = true;
    } else {
      updateSuggestions('white', countOfBallInSolution);
      updateSuggestions('black', countOfBallAtCorrectPlace);
      updateSuggestions('cross', countOfWrongBall);
      newResponses[activeRowIndex].rowSuggestions = rowSuggestions;
    }

    dispatch({
      type: 'handleRowCheck',
      payload: {
        responses: newResponses,
        correctSolution: isCorrectResponse,
        showModal: isCorrectResponse || activeRowIndex === 9,
        showRowCheckButton: undefined,
        activeRowIndex: activeRowIndex + 1,
      },
    });
  };

  /**
   * This function is to create a new game and reset all the past data
   */
  const handleNewGame = () => {
    dispatch({ type: 'reset', payload: generateSolution() });
  };

  return (
    <div className="App">
      <div className="heading">
        <span className="yellow">M</span>
        <span className="pink">A</span>
        <span className="green">S</span>
        <span className="aqua">T</span>
        <span className="steelBlue">E</span>
        <span className="purple">R</span>
        <span>MIND</span>
      </div>
      <div className="game">
        <Rows
          responses={responses}
          updateResponses={updateResponses}
          activeRowIndex={activeRowIndex}
          showRowCheckButton={showRowCheckButton}
          handleRowCheck={handleRowCheck}
        />
        <SelectBall updateBall={updateBall} selectedBall={selectedBall} />
      </div>

      <Modal visible={showModal} footer={null} closable={false}>
        <div className="success-modal">
          <h1>
            {correctSolution ? (
              <span>
                Congratulations <>🎉</>
              </span>
            ) : (
              <>Ah! you were not able to guess!!</>
            )}
          </h1>
          <Button type="primary" onClick={() => handleNewGame()}>
            Play Again
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
