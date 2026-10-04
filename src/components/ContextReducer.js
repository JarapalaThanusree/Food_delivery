import React, { createContext, useReducer, useContext } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const existingIndex = state.findIndex(
        (item) => item.id === action.id && item.size === action.size
      );

      if (existingIndex !== -1) {
        const newState = [...state];
        newState[existingIndex].qty += (action.qty) / 2;
        return newState;
      }
      else {
        return [...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img
        }];
      }

    case "REMOVE":
      let newArr = [...state]
      newArr.splice(action.index, 1);
      return newArr

    case "DROP":
      let empArray = []
      return empArray
    default:
      console.log("Error in Reducer");
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
