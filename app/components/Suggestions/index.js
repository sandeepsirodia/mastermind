/**
 *
 * Suggestions
 *
 */

import React from 'react';
import Circle from 'components/Circle';
import { generateIds } from 'utils/functions';
import PropTypes from 'prop-types';

import './style.css';

function Suggestions({ rowSuggestions }) {
  return (
    <div key={generateIds()} className="suggestions">
      {rowSuggestions.map(type => (
        <Circle key={generateIds()} type={type} />
      ))}
    </div>
  );
}

Suggestions.propTypes = {
  rowSuggestions: PropTypes.array,
};

export default Suggestions;
