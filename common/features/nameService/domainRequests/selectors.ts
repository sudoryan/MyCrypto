import { AppState } from 'features/reducers';

const getNameService = (state: AppState) => state.nameService;

export const getDomainRequests = (state: AppState) => getNameService(state).domainRequests;
