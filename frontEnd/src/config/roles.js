const components = {
    home: {
        component: 'Home',
        url: '/home'
    },
    register: {
        component: 'Register',
        url: '/register'
    },
    contactus: {
        component: 'ContactUs',
        url: '/contactus'
    },
    upload: {
        component: 'Upload',
        url: '/upload'
    },
    lectures: {
        component: 'ProductLecture',
        url: '/lectures'
    },
    planners: {
        component: 'ProductPlanner',
        url: '/planners'
    },
    others: {
        component: 'ProductOthers',
        url: '/others'
    },
    product: {
        component: 'ProductDetail',
        url: '/product/:id'
    },
    shoppingcart: {
        component: 'ShoppingCart',
        url: '/shoppingcart'
    },
    myaccount: {
        component: 'MyAccount',
        url: '/myaccount'
    },
    doneshop: {
        component: 'DoneShop',
        url: '/doneshop'
    },
}

export default {
    admin: {
        routes: [...Object.values(components)],
        redirect: ['/home']
    },
    user: {
        routes: [
            components.home,
            components.register,
            components.contactus,
            components.lectures,
            components.planners,
            components.others,
            components.product,
            components.shoppingcart,
            components.myaccount,
            components.doneshop,
        ],
        redirect: ['/home']
    },
    guest: {
        routes: [
            components.home,
            components.register,
            components.contactus,
            components.lectures,
            components.planners,
            components.others,
            components.product,
        ],
        redirect: ['/home']
    }
}