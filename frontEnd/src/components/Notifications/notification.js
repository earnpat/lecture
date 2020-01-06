import { notification, Icon } from 'antd'
import React from 'react'

const loginError = message => {
	notification.open({
		message: 'Login Fail',
		description: message,
		icon: <Icon type="close-circle" style={{ color: '#dc4d4d' }} />,
	});
};

export { loginError }