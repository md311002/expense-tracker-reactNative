export const addExpense = (expense) => (dispatch) => {
    dispatch({ type: 'ADD', payload: expense })
}
export const updateExpense = (id, expense) => (dispatch) => {
    dispatch({ type: 'UPDATE', payload: { data: expense, id: id } })
}
export const deleteExpense = (id) => (dispatch) => {
    dispatch({ type: 'DELETE', payload: id })
}