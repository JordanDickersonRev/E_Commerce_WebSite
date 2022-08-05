import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState({
    username: '',
    image: '',
    description:'',
    size:'',
    price:'',
    subTotal: 0,
});

export {setGlobalState, useGlobalState};