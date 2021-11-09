REACTIONS_URL = 'http://localhost:3000/reactions'

export const getReactions = () => {
    return dispatch => {
        dispatch({ type: LOADING_REACTIONS})
        fetch(REACTIONS_URL)
        .then(res => res.json())
        .then(reacts => dispatch({
            type: 'ADD_REACTIONS',
            payload: reacts
        }))
    }
}

export const setReactions = (reportId) => {
    return dispatch => {
        fetch(REACTIONS_URL + '/' + reportId)
        .then(res => res.json())
        .then(reactions => dispatch({
            type: 'SET_SELECTED_REPORT',
            payload: reactions
        }))
    }}

export const reactionFormChange = (e) => ({
    type: "REACTION_FORM_CHANGE",
    payload: { name: e.target.name, value: e.target.value }
})

export const createReaction = (reportData) => {
    return dispatch => {
        fetch(REPORTS_URL, {
            method: 'POST',
            body: reportData,
        })
        .then(res => res.json())
        .then(reactions => dispatch({
            type: 'ADD_REACTIONS',
            payload: reactions
    }))
}}