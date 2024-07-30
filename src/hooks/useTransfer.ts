import { useCallback } from 'react'
import { Address, beginCell, toNano } from '@ton/core'
import { CHAIN, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { CURRENT_NETWORK_NAME } from '@/constants/config'
import { useUserJettonWallet } from './useJetton'

export function useTonTransfer() {
  const [tonConnect] = useTonConnectUI()

  return useCallback(
    async (value: number, to: string, body?: string) => {
      await tonConnect.sendTransaction({
        validUntil: Date.now() + 5 * 60 * 1000,
        network: CURRENT_NETWORK_NAME === 'testnet' ? CHAIN.TESTNET : CHAIN.MAINNET,
        messages: [
          {
            address: Address.parse(to).toString({ bounceable: CURRENT_NETWORK_NAME === 'testnet' ? false : true }),
            amount: toNano(value).toString(),
            // todo src type
            payload: body
              ? beginCell().storeUint(0, 64).storeStringTail(body).endCell().toBoc({ idx: false }).toString('base64')
              : undefined
          }
        ]
      })
    },
    [tonConnect]
  )
}

export function useJettonTransfer(jettonMasterContract: string) {
  const [tonConnect] = useTonConnectUI()
  const tonAddress = useTonAddress()

  const userJWA = useUserJettonWallet(jettonMasterContract)

  return useCallback(
    async (amount: bigint, to: string) => {
      if (!userJWA || !tonAddress) return
      const body = beginCell()
        .storeUint(0xf8a7ea5, 32) // jetton Transfer code
        .storeUint(new Date().getTime(), 64) // query_id:uint64
        .storeCoins(amount) // amount:(VarUInteger 16)
        .storeAddress(Address.parse(to)) // destination:MsgAddress
        .storeAddress(Address.parse(tonAddress)) // response_destination:MsgAddress
        .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
        .storeCoins(toNano('0')) // forward_ton_amount:(VarUInteger 16)
        .storeUint(0, 1) // forward_payload:(Either Cell ^Cell)
        .endCell()

      await tonConnect.sendTransaction({
        validUntil: Date.now() + 5 * 60 * 1000,
        network: CURRENT_NETWORK_NAME === 'testnet' ? CHAIN.TESTNET : CHAIN.MAINNET,
        messages: [
          {
            address: userJWA.toString(),
            amount: toNano('0.05').toString(), // todo
            payload: body.toBoc({ idx: false }).toString('base64')
          }
        ]
      })
    },
    [tonAddress, tonConnect, userJWA]
  )
}
