import { useTonClient } from './useTonClient'
import { useRequest } from 'ahooks'
import { Address, JettonMaster } from '@ton/ton'
import { useTonAddress } from '@tonconnect/ui-react'
import { CURRENT_NETWORK_NAME } from '@/constants/config'

const uri =
  CURRENT_NETWORK_NAME === 'testnet' ? 'https://testnet.tonapi.io/v2/jettons/' : 'https://tonapi.io/v2/jettons/'

export type JettonVerificationType = 'whitelist' | 'blacklist' | 'none'

export type JettonMetadata = {
  address: string
  decimals: string
  name: string
  symbol: string
  description?: string
  image?: string
  social?: string[]
  websites?: string[]
  catalogs?: string[]
}

export type JettonMasterData = {
  admin: {
    address: string
    is_scam: boolean
    is_wallet: boolean
  }
  holders_count: number
  metadata: JettonMetadata
  mintable: boolean
  total_supply: string
  verification: JettonVerificationType
}

export function useJettonMasterData(jettonMasterContract?: string) {
  const { data } = useRequest(
    async () => {
      const ret = await (await fetch(uri + jettonMasterContract)).json()
      return ret as JettonMasterData
    },
    {
      ready: !!jettonMasterContract,
      cacheKey: `useJettonMasterData-${jettonMasterContract}`,
      staleTime: 600_000,
      refreshDeps: [jettonMasterContract]
    }
  )

  return data
}

export function useUserJettonWallet(jettonMasterContract?: string) {
  const client = useTonClient()
  const tonAddress = useTonAddress()

  const { data } = useRequest(
    async () => {
      if (!jettonMasterContract || !client || !tonAddress) return
      const jettonMasterAddress = Address.parse(jettonMasterContract)
      const userAddress = Address.parse(tonAddress)

      const jettonMaster = client.open(JettonMaster.create(jettonMasterAddress))

      const userJWA = await jettonMaster.getWalletAddress(userAddress)
      return userJWA
    },
    {
      ready: !!client && !!jettonMasterContract && !!tonAddress,
      cacheKey: `useUserJettonWallet-${jettonMasterContract}-${tonAddress}`,
      staleTime: 600_000,
      refreshDeps: [client, jettonMasterContract, tonAddress]
    }
  )

  return data
}
