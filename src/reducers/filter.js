import createReducer, { RESET_STORE } from '../createReducer'

export const SET_FILTERS = 'Filter.SET_FILTERS'
export const CLEAR = 'Filter.CLEAR'

export const setFilters = (min, max, options) => (dispatch, getState) => {
    return dispatch({ type: SET_FILTERS, payload: { min, max, options } })
}
export const clear = () => ({ type: CLEAR })

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    min: null,
    max: null,
    options: '{}'
}

export default createReducer(initialState, {
    [SET_FILTERS]: (state, { payload: { min, max, options } }) => ({
        min, max, options
    }),
    [CLEAR]: (state, action) => RESET_STORE,
})
