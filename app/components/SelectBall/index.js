/**
 *
 * SelectBall
 *
 */

import React from 'react';
import Circle from 'components/Circle';
import { ALL_BALLS } from 'utils/constants';
import PropTypes from 'prop-types';
import './style.css';

function SelectBall({ updateBall, selectedBall }) {
  const getBalls = () =>
    ALL_BALLS.map(ball => (
      <div
        key={ball}
        onClick={() => {
          updateBall(ball);
        }}
        className={selectedBall === ball ? 'selectedBall' : ''}
        aria-hidden="true"
      >
        <Circle color={ball} />
      </div>
    ));

  return <div className="select-ball">{getBalls()}</div>;
}

SelectBall.propTypes = {
  updateBall: PropTypes.func,
  selectedBall: PropTypes.string,
};

export default SelectBall;
