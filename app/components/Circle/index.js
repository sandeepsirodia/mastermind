/**
 *
 * Circle
 *
 */

import React from 'react';
import { generateIds } from 'utils/functions';
import './style.css';

function Circle({ color, type }) {
  const getCircle = () => {
    switch (type) {
      case 'black':
        return <div key={generateIds()} className="black small circle" />;
      case 'white':
        return <div key={generateIds()} className="white small circle cross" />;
      case 'cross':
        return (
          <div key={generateIds()} className="small circle cross">
            x
          </div>
        );
      default:
        return (
          <div key={generateIds()} className={`${color || 'white'} circle`} />
        );
    }
  };
  return getCircle();
}

export default Circle;
