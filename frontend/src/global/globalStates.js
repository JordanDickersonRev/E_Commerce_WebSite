import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
    username: '',
    bag: [],
});

export {setGlobalState, useGlobalState};