import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
    username: '',
    subTotal: 0,
});

export {setGlobalState, useGlobalState};