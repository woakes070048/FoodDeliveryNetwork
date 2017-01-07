/* jshint esversion: 6 */

import expect from 'expect';
import * as actionTypes from './action-types';
import * as actions from './actions';

// Test a sync action
describe('Firebase Actions', () => {
  describe('fetchUser', () => {
    it('should create a FIREBASE_FETCH_USER action', () => {
      const action = actions.fetchUser();

      expect(action.type)
        .toEqual(actionTypes.FIREBASE_FETCH_USER);
      expect(typeof action.operationId)
        .toNotBe('undefined');
      expect(action.operationId.length)
        .toBeGreaterThan(0);
    });
  });
});
