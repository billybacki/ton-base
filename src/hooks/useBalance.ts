import { useRequest } from 'ahooks'
import { useTonClient } from './useTonClient'
import { Address } from '@ton/core'
import { useUserJettonWallet } from './useTransfer'
import { JettonWallet } from '@ton/ton'

export function useTonBalance(address?: string) {
  const client = useTonClient()

  const { data: balance } = useRequest(
    async () => {
      if (!client || !address) return undefined
      const res = await client.getBalance(Address.parse(address))
      return res
    },
    {
      refreshDeps: [client, address]
    }
  )

  return balance
}

export function useJettonBalance(jettonMasterContract: string) {
  const client = useTonClient()
  const userJWA = useUserJettonWallet(jettonMasterContract)

  const { data: balance } = useRequest(
    async () => {
      if (!client || !userJWA) return undefined
      const contract = JettonWallet.create(userJWA)

      const data = await contract.getBalance(client.provider(contract.address))

      return data
    },
    {
      refreshDeps: [client, userJWA]
    }
  )

  return balance
}
