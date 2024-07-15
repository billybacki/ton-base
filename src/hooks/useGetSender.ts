import { CHAIN, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react'
import { Address, Sender, SenderArguments, beginCell, storeStateInit } from '@ton/core'
import { useCallback } from 'react'
import { CURRENT_NETWORK_NAME } from '@/constants/config'

export function useGetSender() {
  const address = useTonAddress()
  const [tonConnect] = useTonConnectUI()
  return useCallback((): Sender => {
    if (!address) {
      throw new Error('Not connected')
    }

    const init = (init: any) => {
      const result = init
        ? beginCell().store(storeStateInit(init)).endCell().toBoc({ idx: false }).toString('base64')
        : undefined

      return result
    }

    return {
      address: Address.parse(address!),
      async send(args: SenderArguments) {
        await tonConnect.sendTransaction({
          validUntil: Date.now() + 5 * 60 * 1000,
          network: CURRENT_NETWORK_NAME === 'testnet' ? CHAIN.TESTNET : CHAIN.MAINNET,
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              stateInit: init(args.init),
              payload: args.body ? args.body.toBoc().toString('base64') : undefined
            }
          ]
        })
      }
    }
  }, [address, tonConnect])
}
