import { createSlice } from '@reduxjs/toolkit'

export interface ICacheLoginInfo {
  token: string
  userId: string | number
  address: string
}

const LOCAL_USER_TOKEN_KEY = 'LOCAL_USER_TOKEN_KEY'
export const getLocalUserToken = (): ICacheLoginInfo => {
  let _local: any = ''
  try {
    _local = JSON.parse(localStorage.getItem(LOCAL_USER_TOKEN_KEY) || '')
  } catch (error) {
    _local = ''
    console.error(error)
  }
  return {
    token: _local?.token || '',
    userId: _local?.userId || '',
    address: _local?.address || ''
  }
}
const saveLocalUserToken = (data: ICacheLoginInfo | null) => {
  localStorage.setItem('LOCAL_USER_TOKEN_KEY', data ? JSON.stringify(data) : '')
}

const localUserToken = getLocalUserToken()

const initialState: ICacheLoginInfo & {
  userInfo: any
} = {
  token: localUserToken.token,
  userId: localUserToken.userId,
  address: localUserToken.address,
  userInfo: null
}

export const userInfoSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    saveLoginInfo: (state, { payload }) => {
      state.token = payload.token
      state.userId = payload.userId
      state.address = payload.address

      saveLocalUserToken({
        token: payload.token,
        userId: payload.userId,
        address: payload.address
      })
    },
    removeLoginInfo: state => {
      state.token = ''
      state.userId = 0
      state.address = ''
      saveLocalUserToken(null)
    },
    removeUserInfo: state => {
      state.userInfo = null
    }
  }
  // extraReducers: {}
})

export const { saveLoginInfo, removeUserInfo, removeLoginInfo } = userInfoSlice.actions
export default userInfoSlice.reducer
