import { createSlice } from '@reduxjs/toolkit';
import {
  addContactThunk,
  fetchContactsThunk,
  removeContactThunk,
} from './contactsAsyncThunk';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [], isLoading: false, error: null },
  extraReducers: build => {
    build.addCase(fetchContactsThunk.pending, (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    });
    build.addCase(fetchContactsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.contacts = payload;
    });
    build.addCase(fetchContactsThunk.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
    build.addCase(addContactThunk.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    build.addCase(addContactThunk.fulfilled, (state, { payload }) => {
      state.contacts.unshift(payload);
      state.isLoading = false;
    });
    build.addCase(addContactThunk.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
    build.addCase(removeContactThunk.pending, (state, { payload }) => {
      state.isLoading = true;
      state.error = null;
    });
    build.addCase(removeContactThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      console.log(state.contacts);
      state.contacts = state.contacts.filter(({ id }) => id !== payload.id);
    });
    build.addCase(removeContactThunk.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error;
    });
  },
});

export const contactsReducer = contactsSlice.reducer;

// export default contactsSlice.reducer;
