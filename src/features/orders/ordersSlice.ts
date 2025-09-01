import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OrdersFilterState {
  searchOrderNo: string;
  status: number | null;
  page: number;
  pageSize: number;
  dateFrom: string | null;
  dateTo: string | null;
}

const initialState: OrdersFilterState = {
  searchOrderNo: "",
  status: null,
  page: 1,
  pageSize: 10,
  dateFrom: null,
  dateTo: null,
};

const ordersSlice = createSlice({
  name: "ordersFilters",
  initialState,
  reducers: {
    setSearchOrderNo: (state, action: PayloadAction<string>) => {
      state.searchOrderNo = action.payload;
      state.page = 1;
    },
    setStatusFilter: (state, action: PayloadAction<number | null>) => {
      state.status = action.payload;
      state.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setDateFrom: (state, action: PayloadAction<string | null>) => {
      state.dateFrom = action.payload;
      state.page = 1;
    },
    setDateTo: (state, action: PayloadAction<string | null>) => {
      state.dateTo = action.payload;
      state.page = 1;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearchOrderNo,
  setStatusFilter,
  setDateFrom,
  setDateTo,
  resetFilters,
  setPage,
  setPageSize,
} = ordersSlice.actions;
export default ordersSlice.reducer;
