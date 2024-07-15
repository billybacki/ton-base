import { getContractAddress } from '@/constants/addresses'
import Counter from '../contracts/counter'
import { useTonClient } from './useTonClient'
import { useGetSender } from './useGetSender'
import { Address, OpenedContract } from '@ton/core'
import { useRequest } from 'ahooks'

export function useCounterContract() {
  const client = useTonClient()
  const getSender = useGetSender()

  const { data: counterContract } = useRequest(
    async () => {
      if (!client) return
      const contract = new Counter(
        Address.parse(getContractAddress('Test_Counter_Address')) // replace with your address from tutorial 2 step 8
      )
      return client.open(contract) as OpenedContract<Counter>
    },
    {
      refreshDeps: [client]
    }
  )

  const { data: value } = useRequest(
    async () => {
      if (!counterContract) return
      const val = await counterContract.getCounter()
      return val.toString()
    },
    {
      pollingInterval: 5000
    }
  )

  return {
    value,
    contractAddress: counterContract?.address.toString(),
    sendIncrement: () => {
      return counterContract?.sendIncrement(getSender())
    }
  }
}
