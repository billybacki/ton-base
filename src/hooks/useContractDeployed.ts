import { useTonClient } from './useTonClient'
import { useRequest } from 'ahooks'
import { Address } from '@ton/ton'

// todo query once?
export function useContractDeployed(contractAddress?: string) {
  const client = useTonClient()

  const { data } = useRequest<boolean | undefined, []>(
    async () => {
      if (!client || !contractAddress) return

      const contractAddr = Address.parse(contractAddress)

      const isContractDeployed = await client.isContractDeployed(contractAddr)
      return isContractDeployed
    },
    {
      ready: !!client && !!contractAddress,
      cacheKey: `useContractDeployed-${contractAddress}`,
      staleTime: 10_000,
      pollingInterval: 10_000,
      refreshDeps: [client, contractAddress]
    }
  )

  return data
}
