/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import _ from 'lodash';
import { DEFAULT_RESPONSES } from 'utils/constants';

const initialState = {
  responses: _.cloneDeep(DEFAULT_RESPONSES),
  solution: undefined,
  activeRowIndex: 0,
  correctSolution: false,
  showRowCheckButton: undefined,
};

const reducer = (reducerState, action) => {
  switch (action.type) {
    case 'handleRowCheck': {
      const {
        response,
        activeRowIndex,
        showRowCheckButton,
        correctSolution,
      } = action.payload;

      return {
        ...reducerState,
        response,
        activeRowIndex,
        showRowCheckButton,
        correctSolution,
      };
    }

    case 'updateNewSolution': {
      return { ...reducerState, solution: action.payload };
    }

    case 'reset': {
      return {
        ...initialState,
        responses: _.cloneDeep(DEFAULT_RESPONSES),
        solution: action.payload,
      };
    }
    case 'updateResponses': {
      const { responses, showRowCheckButton } = action.payload;
      return { ...reducerState, responses, showRowCheckButton };
    }
    default:
      break;
  }
  return reducerState;
};

export { initialState, reducer };
