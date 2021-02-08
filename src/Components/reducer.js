export const initialState = {
    user: null,
    lastMessage: "",
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_MESSAGE: "SET_MESSAGE"
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }   
        case actionTypes.SET_MESSAGE:
            return {
                ...state,
                lastMessage: action.message
            }
        default:
            return state;
    }
};

export default reducer;