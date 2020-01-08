// REDUCER => อธิบายว่า action ที่มันส่งมาหากู มันให้ทำอะไรบ้าง แล้วกูก็จะได้ทำแล้วอัพเดท Store (state ของกู)
let initialState = {
  cartList: [],
  total: 0
}
const cartReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_CART_LIST':
      const isFound = state.find(product => action.payload.product_id == product.product_id)
      if (isFound) {
        for (let product of state) {
          if (product.product_id == action.payload.product_id) {
            product.quantity += action.payload.quantity;
          }
        }
        return state
      } else {
        return [...state, action.payload]
      }

    default:
      return state
  }
}

export default cartReducer

// ACTION CREATOR => ผู้สร้าง Action | Action คือ ใบสั่ง (เดี๋ยวส่งให้ reducer ไปทำ) โดยจะส่งค่าไปให้ด้วย (ให้นึกถึงเราสั่งอาหาร อีนี่ คือใบสั่งอาหาร)

export const actions = {
  setCartList: (data) => {
    return {
      type: 'SET_CART_LIST',
      payload: data
    }
  }
}