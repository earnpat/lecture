import { Alert } from 'antd'
import React from 'react'

const loginError = () => {
    return (
        <Alert
            message="Error"
            description="This is an error message about copywriting."
            type="error"
            showIcon
        />)
}

export { loginError }