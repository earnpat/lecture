import { notification, Icon } from 'antd'
import React from 'react'

const loginError = message => {
	notification.open({
		message: 'เข้าสู่ระบบผิดพลาด',
		description: message,
		icon: <Icon type="close-circle" style={{ color: '#dc4d4d' }} />,
	});
};

const warningShopEmpty = message => {
	notification.open({
		message: 'กรุณาเพิ่มสินค้า',
		description: message,
		icon: <Icon type="warning" style={{ color: '#ffff33' }} />,
	});
};

const warningLogin = message => {
	notification.open({
		message: 'กรุณาเข้าสู่ระบบ',
		description: message,
		icon: <Icon type="close-circle" style={{ color: '#dc4d4d' }} />,
	});
};

export { loginError, warningShopEmpty, warningLogin }