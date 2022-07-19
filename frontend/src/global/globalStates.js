import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
    username: '',
    favorites: [],
    bag: [],
});

export {setGlobalState, useGlobalState};