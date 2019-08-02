import * as Types from '../utils/constants';

const initialState = false;

const changeState = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_LAYOUT:
            state = action.collapsed;
            return state;
        default:
            return state;
    }
}
export default changeState;