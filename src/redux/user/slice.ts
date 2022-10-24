import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
  username: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
  username: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (paramaters: {
    email: string,
    password: string,
  }) => {
    const { data } = await axios.post(
      `http://localhost:4000/login`,{
        username: paramaters.email,
        password: paramaters.password
      }
    );
    return data.user;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.name;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
