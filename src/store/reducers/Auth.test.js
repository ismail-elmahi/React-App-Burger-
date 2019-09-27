import reducer from './Auth';
import * as actionTypes from '../actions/actionType';
import { isTSAnyKeyword, exportAllDeclaration } from '@babel/types';

describe('auth reducer', () => {
    it('should return the initail state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error : null,
            loading: false,
            authRedirectPath: '/'
        })
    })
    it('should store the token upon login', () => {
       expect(reducer({
        token: null,
        userId: null,
        error : null,
        loading: false,
        authRedirectPath: '/'
       }, {type: actionTypes.AUTH_SUCCESS,
           idToken: 'some-token',
           userId: 'some_user_id'
    })).toEqual({
        token: 'some-token', 
        userId: 'some_user_id',
        error : null,
        loading: false,
        authRedirectPath: '/'
    })
    })
})