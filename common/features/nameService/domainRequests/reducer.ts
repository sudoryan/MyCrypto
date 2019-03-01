import * as ensTypes from '../types';
import * as types from './types';

const REQUESTS_INITIAL_STATE: types.NameServiceDomainRequestsState = {};

const resolveDomainRequested = (
  state: types.NameServiceDomainRequestsState,
  action: ensTypes.ResolveDomainRequested
): types.NameServiceDomainRequestsState => {
  const { domain } = action.payload;
  const nextDomain = {
    ...state[domain],
    state: types.RequestStates.pending
  };
  return { ...state, [domain]: nextDomain };
};

const resolveDomainSuccess = (
  state: types.NameServiceDomainRequestsState,
  action: ensTypes.ResolveDomainSucceeded
): types.NameServiceDomainRequestsState => {
  const { domain, domainData } = action.payload;
  const nextDomain = {
    data: domainData,
    state: types.RequestStates.success
  };

  return { ...state, [domain]: nextDomain };
};

const resolveDomainCached = (
  state: types.NameServiceDomainRequestsState,
  action: ensTypes.ResolveDomainCached
): types.NameServiceDomainRequestsState => {
  const { domain } = action.payload;
  const nextDomain = {
    ...state[domain],
    state: types.RequestStates.success
  };

  return { ...state, [domain]: nextDomain };
};

const resolveDomainFailed = (
  state: types.NameServiceDomainRequestsState,
  action: ensTypes.ResolveDomainFailed
): types.NameServiceDomainRequestsState => {
  const { domain, error } = action.payload;
  const nextDomain = {
    error: true,
    errorMsg: error.message,
    state: types.RequestStates.failed
  };

  return { ...state, [domain]: nextDomain };
};

export function nameServiceDomainRequestsReducer(
  state: types.NameServiceDomainRequestsState = REQUESTS_INITIAL_STATE,
  action: ensTypes.ResolveDomainAction
): types.NameServiceDomainRequestsState {
  switch (action.type) {
    case ensTypes.NameServiceActions.RESOLVE_DOMAIN_REQUESTED:
      return resolveDomainRequested(state, action);
    case ensTypes.NameServiceActions.RESOLVE_DOMAIN_SUCCEEDED:
      return resolveDomainSuccess(state, action);
    case ensTypes.NameServiceActions.RESOLVE_DOMAIN_FAILED:
      return resolveDomainFailed(state, action);
    case ensTypes.NameServiceActions.RESOLVE_DOMAIN_CACHED:
      return resolveDomainCached(state, action);
    default:
      return state;
  }
}
