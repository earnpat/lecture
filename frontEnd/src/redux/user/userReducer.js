const INTIAL_STATE = {
    id: 'user_id',
    password: 'user_password',
    firstname: '',
    lastname: '',
    birth: '',
    email: '',
    address: '',
    tel: ''
}

const userReducer = (state=INTIAL_STATE, action) => {
    switch(action.type)
    {
        case 'SET_USER_DATA':
            return state = action.payload
            
        default: return state
    }
}

export default userReducer