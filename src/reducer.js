const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    // when we return something from the reducer that will be our new state
    // so we return the object, that will be our new state,
    // copy out the old state value and the only object in the state that we are going to change is the cart
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }

  //   increase
  if (action.type === "INCREASE_ITEM") {
    let tempCart = state.cart.map((cartItem) => {
      if (cartItem.id === action.payload) {
        //   ...cartItem copies all the object in each click item,
        //    the object in the cartItem to be worked on is amount:cartItem.amount + 1
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    //    ...state copies all the object in the state,then select the particular object in the state we want our function to work with, which is cart
    return { ...state, cart: tempCart };
  }

  //   decrease
  if (action.type === "DECREASE_ITEM") {
    let tempCart = state.cart
      .map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      //   filtering cartItem.amount should not be equal to zero
      // it implies that ...state.amount should have every other number of item apart from zero
      // remove item from the cart if it goes below one

      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }

  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        //   get the total
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        //   increase the number of item in the cart
        // iterate and add up each cartItem
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        //   we are returning zero to the total and amount of the initial state
        // because if we add any number it will be added to the total which will affect the looping
        total: 0,
        amount: 0,
      }
    );
    // parseFloat will limit the number after the dot in total $5463
    total = parseFloat(total.toFixed(2));
    //   ...state since i woundnt want to mess with other value,
    //   select the only value you want to work with and return
    // console.log(total)
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
//   if (action.type === "TOGGLE_AMOUNT") {
//     let tempCart = state.cart.map((cartItem) => {
//       if (cartItem.id === action.payload.id) {
//         if (action.payload.type === "inc") {
//           return { ...cartItem, amount: cartItem.amount + 1 };
//         }
//         if (action.payload.type === "dec") {
//           return { ...cartItem, amount: cartItem.amount - 1 };
//         }
//       }
//       return cartItem;
//     }).filter((cartItem) => cartItem.amount !== 0);
//     return { ...state, cart: tempCart };
//   }

// throw new Error ('no matching action type') in place of return state below
  return state;
};
export default reducer;
