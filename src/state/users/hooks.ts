import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'

// import { useCallback, useEffect, useState } from 'react'
import { ICacheLoginInfo, removeUserInfo, saveLoginInfo } from './reducer'
import { useTonAddress } from '@tonconnect/ui-react'
import { AppState } from '..'

interface IUserInfoData {}

export const useLogout = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(
      saveLoginInfo({
        token: '',
        userId: '',
        userType: '',
        address: ''
      })
    )
    dispatch(removeUserInfo())
  }
  return { logout: handleLogout }
}

export function useUserInfo(): ICacheLoginInfo & {
  userInfo?: IUserInfoData
} {
  const address = useTonAddress()
  const loginInfo = useSelector<AppState, AppState['users']>(state => state.users)
  if (address !== loginInfo.address) {
    return {
      address: '',
      token: '',
      userId: 0,
      userInfo: undefined
    }
  }
  return loginInfo
}

// export function useRefreshUserInfoByFirstLoad() {
//   const [first, setFirst] = useState(true)
//   const dispatch = useDispatch()
//   const { token, userId } = useUserInfo()

//   useEffect(() => {
//     if (!first || !token || !userId) return
//     setFirst(false)
//     dispatch(
//       fetchUserInfo({
//         userId: userId
//       })
//     )
//   }, [dispatch, first, token, userId])
// }

// export function useRefreshUserInfoCallback() {
//   const dispatch = useDispatch()
//   const { token, userId } = useUserInfo()

//   return useCallback(() => {
//     if (!token || !userId) return
//     dispatch(
//       fetchUserInfo({
//         userId: userId
//       })
//     )
//   }, [dispatch, token, userId])
// }

// export function useUpdateUserLoginInfoWithWindowVisible() {
//   const windowVisible = useIsWindowVisible()
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const localUserToken = getLocalUserToken()

//     if (windowVisible) {
//       dispatch({
//         type: 'users/saveLoginInfo',
//         payload: {
//           token: localUserToken?.token,
//           userId: localUserToken?.userId,
//           address: localUserToken?.address
//         }
//       })
//     }
//   }, [dispatch, windowVisible])
// }
