export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

const DEFAULT_RESPONSES = [
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
  { response: ['', '', '', ''], rowSuggestions: [] },
];

const ALL_BALLS = ['yellow', 'pink', 'green', 'aqua', 'steelBlue', 'purple'];

export { DEFAULT_RESPONSES, ALL_BALLS };
