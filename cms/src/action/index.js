import * as Types from '../utils/constants';

export const actAdd = (collapsed) => {
    return {
        type: Types.CHANGE_LAYOUT,
        collapsed
    }
}

export default actAdd;