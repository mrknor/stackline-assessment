import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData } from '../types';

interface SalesState {
  product: ProductData | null;
  loading: boolean;
  error: string | null;
}

const initialState: SalesState = {
  product: null,
  loading: false,
  error: null,
};

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<ProductData>) => {
      state.product = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setProduct, setLoading, setError } = salesSlice.actions;
export default salesSlice.reducer;