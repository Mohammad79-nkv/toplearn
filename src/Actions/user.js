export const setUser = user => {
    return async (dispatch) => {
        await dispatch({type : "SET_USER", payload : user})
    }
}

export const clearUser = user => {
    return async (dispatch) => {
        await dispatch({type : "CLEAR_USER", payload : {}})
    }
}