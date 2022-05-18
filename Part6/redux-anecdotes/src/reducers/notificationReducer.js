
const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'NOTIFICATION':
            return action.message
        default:
            return state
    }
}

export const showNotification = (message) => {
    return async (dispatch) => {
        dispatch({
            type: 'NOTIFICATION',
            message
        })
        setTimeout(() => {
            dispatch({
                type: 'NOTIFICATION',
                message: null
            })
        }, 5000)
    }
}

export default notificationReducer

    