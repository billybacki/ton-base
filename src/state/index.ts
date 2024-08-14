import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { load, save } from 'redux-localstorage-simple-next'
import application from './application/reducer'
import { updateVersion } from './global/actions'
import users from './users/reducer'
const PERSISTED_KEYS: string[] = ['transactions']

const reducer = combineReducers({
  application,
  users
})

const store = configureStore({
  reducer,
  // middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })],
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: true }).concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({ states: PERSISTED_KEYS })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
