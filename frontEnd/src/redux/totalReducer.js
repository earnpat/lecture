const cartReducer = (state = 0, action) => {
    switch (action.type) {
  
      case 'ADD_TOTAL':
        return state + action.total
      default:
        return state
    }
  }
  
  export default cartReducer

  export const actions = {
    setTotalList: (total) => {
      return {
        type: 'ADD_TOTAL',
        total: total
      }
    }
  }