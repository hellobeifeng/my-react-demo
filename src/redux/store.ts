import { userSlice } from './user/slice';
import { productDetailSlice } from './productDetail/slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  productDetail: productDetailSlice.reducer,
  user: userSlice.reducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export default store