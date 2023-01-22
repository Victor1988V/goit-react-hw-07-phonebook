import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: { value: '' },
  reducers: {
    filterContacts: (store, { payload }) => {
      store.value = payload;
      //  store.filter(stor => stor.name.includes(payload.toLowerCase()));
    },
  },
});

export const { filterContacts } = filterSlice;

export default filterSlice;
