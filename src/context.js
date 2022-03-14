import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  createContext,
} from "react";
import reducer from "./reducer";
import cartItems from "./data";

const url = "https://course-api.com/react-useReducer-cart-project";
console.log(url)

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  // instead of useState we will use useReducer
  //   const [cart, setCart] = useState(cartItems);
  // we are not going to use cart we will use state
  // and instead of setCart we will use dispatch

  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const remove = (id) => {
    // use payload to pass in id
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const increase = (id) => {
    dispatch({ type: "INCREASE_ITEM", payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: "DECREASE_ITEM", payload: id });
  };

const fetchData = async () => {
    dispatch({type:'LOADING'});
    const response = await fetch(url);
    const cart =await response.json();
    dispatch({type:'DISPLAY_ITEMS', payload:cart})

}
// refactoring the increase and decrease into a single function to avoid repeatation
// const toggleAmount = (id,type)=>{
//     dispatch({type:'TOGGLE_AMOUNT',payload:{id,type}})
// }
useEffect(() => {
   fetchData();
}, [])

  //   useEffect calls anytime my  state.cart changes
  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);
  return (
    <AppContext.Provider
      value={{
        //   spreading(copying) out the state value in order to get each obj properties, just like destructing obj
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        // toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
