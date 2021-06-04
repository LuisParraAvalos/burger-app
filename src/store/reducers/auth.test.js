import reducer from './auth'

import actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual({
      authenticating: false,
      token: null,
      userId: null,
      error: null
    })
  });

  it('should store token upon log in', () => {
    expect(reducer({
      authenticating: false,
      token: null,
      userId: null,
      error: null
    }, {
      type: actionTypes.AUTH_START_SUCCEED,
      token: "A-TOKEN",
      userId: "A-USER-ID"
    })).toEqual({
      authenticating: false,
      error: null,
      token: "A-TOKEN",
      userId: "A-USER-ID"
    })
  });
})
