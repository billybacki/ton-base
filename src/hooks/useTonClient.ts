import { CURRENT_NETWORK_NAME } from '@/constants/config'
import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient } from '@ton/ton'
import { useRequest } from 'ahooks'

export function useTonClient() {
  const { data } = useRequest(
    async () =>
      new TonClient({
        endpoint: await getHttpEndpoint({ network: CURRENT_NETWORK_NAME })
      })
  )

  return data
}
