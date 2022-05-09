import prayTypes from "./pray.types";


const INITIAL_STATE = {
    prNumber: 0,
};

const prayReducer = (state = INITIAL_STATE, action) => {


    switch (action.type) {
        case prayTypes.PRAY_ADDED_SUCCESS:
            return {
                ...state,
                prNumber: prNumber + 1,
            };

        default:
            return state;
    }

}


export default prayReducer;