import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useIsConnectionRestored, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'
import { backendAuth } from './backend-auth'
import { useUserInfo } from '@/state/users/hooks'
import { useDispatch } from 'react-redux'

const localStorageKey = 'dapp-auth-token'
const payloadTTLMS = 1000 * 60 * 20

export function useBackendAuth() {
  const isConnectionRestored = useIsConnectionRestored()
  const wallet = useTonWallet()
  const [tonConnectUI] = useTonConnectUI()
  const interval = useRef<ReturnType<typeof setInterval> | undefined>()
  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const setToken = useCallback(
    (token: string) => {
      dispatch({
        type: 'users/saveLoginInfo',
        payload: {
          userId: userInfo.userId,
          address: userInfo.address,
          token
        }
      })
    },
    [dispatch, userInfo.address, userInfo.userId]
  )
  useEffect(() => {
    if (!isConnectionRestored) {
      return
    }

    clearInterval(interval.current)

    if (!wallet) {
      localStorage.removeItem(localStorageKey)
      if (userInfo.token) {
        setToken('')
      }

      const refreshPayload = async () => {
        tonConnectUI.setConnectRequestParameters({ state: 'loading' })

        // TODO: get sign payload
        // const value = await backendAuth.generatePayload()

        // test payload
        const value = { tonProof: 'test' }
        if (!value) {
          tonConnectUI.setConnectRequestParameters(null)
        } else {
          tonConnectUI.setConnectRequestParameters({ state: 'ready', value })
        }
      }

      refreshPayload()
      setInterval(refreshPayload, payloadTTLMS)
      return
    }

    const token = localStorage.getItem(localStorageKey)
    if (token && token !== userInfo.token) {
      setToken(token)
      return
    }

    if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
      backendAuth.checkProof(wallet.connectItems.tonProof.proof, wallet.account).then(result => {
        if (result) {
          // todo store user info
          setToken(result)
          localStorage.setItem(localStorageKey, result)
        } else {
          console.log('have signed but not verify')

          // tonConnectUI.disconnect()
        }
      })
    } else {
      console.log('have signed but not verify')
      // tonConnectUI.disconnect()
    }
  }, [wallet, isConnectionRestored, setToken, tonConnectUI, userInfo.token])
}

export function useTonProof() {
  const wallet = useTonWallet()
  return useMemo(() => {
    if (!wallet) {
      return
    }
    if (wallet.connectItems?.tonProof && !('error' in wallet.connectItems.tonProof)) {
      return wallet.connectItems.tonProof.proof
    }
    return
  }, [wallet])
}
