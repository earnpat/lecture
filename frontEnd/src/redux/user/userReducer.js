const INTIAL_STATE = {
 data: {}
}

const userReducer = (state=INTIAL_STATE, action) => {
    switch(action.type)
    {
        case 'SET_USER_DATA':
            return {
                ...state,
                data: action.payload
            }
            
        default: return state
    }
}

export default userReducer