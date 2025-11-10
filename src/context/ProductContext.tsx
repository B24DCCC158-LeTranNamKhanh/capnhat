import React, { createContext, useReducer, ReactNode } from 'react';
import { Product } from '../types/Product';
import { initialProducts } from '../data/initialProducts';

type State = {
  products: Product[];
};

type Action =
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: number };

const initialState: State = {
  products: initialProducts,
};

const ProductContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const productReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        products: state.products.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PRODUCT':
      return { products: state.products.filter(p => p.id !== action.payload) };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;