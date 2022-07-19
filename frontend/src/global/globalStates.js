import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
    username: '',
    favorites: [],
});

export {setGlobalState, useGlobalState};