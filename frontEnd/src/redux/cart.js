// REDUCER => อธิบายว่า action ที่มันส่งมาหากู มันให้ทำอะไรบ้าง แล้วกูก็จะได้ทำแล้วอัพเดท Store (state ของกู)

const initialState = {
  cartList: [],
  total: 0
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_CART_LIST':
      // let ,const, console.log()
      return {
        ...state,
        cartList: action.payload
      }

    default:
      return state
  }
}

export default cartReducer







// ACTION CREATOR => ผู้สร้าง Action | Action คือ ใบสั่ง (เดี๋ยวส่งให้ reducer ไปทำ) โดยจะส่งค่าไปให้ด้วย (ให้นึกถึงเราสั่งอาหาร อีนี่ คือใบสั่งอาหาร)
