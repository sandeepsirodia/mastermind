/**
 *
 * Rows
 *
 */

import React from 'react';
import Circle from 'components/Circle';
import Suggestions from 'components/Suggestions';
import { generateIds } from 'utils/functions';
import PropTypes from 'prop-types';

import './style.css';

function Rows({
  responses,
  activeRowIndex,
  updateResponses,
  showRowCheckButton,
  handleRowCheck,
}) {
  /**
   *
   * @param {*} response is a Array of Array of selected balls
   * @param {*} rowIndex is index of the row
   * @returns a single row Node
   */
  const getSingleRow = (response, rowIndex) => (
    <div
      key={rowIndex}
      className={`single-row ${
        activeRowIndex === rowIndex ? 'selected-row' : 'disabled'
      }`}
    >
      {response.response.map((ball, ballIndex) => (
        <div
          aria-hidden="true"
          key={generateIds()}
          onClick={() => updateResponses(rowIndex, ballIndex)}
        >
          <Circle color={ball} />
        </div>
      ))}

      {showRowCheckButton === rowIndex ? (
        <button
          type="button"
          className="button-check"
          onClick={() => handleRowCheck()}
        >
          <img
            src="https://img.icons8.com/color/344/checked-2--v1.png"
            alt="check"
            height={40}
          />
        </button>
      ) : (
        <div />
      )}

      <Suggestions
        rowIndex={rowIndex}
        rowSuggestions={
          response.rowSuggestions.length
            ? response.rowSuggestions
            : ['white', 'white', 'white', 'white']
        }
      />
    </div>
  );

  return (
    <div className="rows">
      {responses.map((response, rowIndex) => getSingleRow(response, rowIndex))}
    </div>
  );
}

Rows.propTypes = {
  responses: PropTypes.array,
  activeRowIndex: PropTypes.number,
  updateResponses: PropTypes.func,
  showRowCheckButton: PropTypes.number,
  handleRowCheck: PropTypes.func,
};

export default Rows;
