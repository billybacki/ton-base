import { CURRENT_NETWORK_NAME } from './config'

export enum NetworkName {
  MAINNET = 'mainnet',
  TESTNET = 'testnet'
}

const ContractAddressObject = {
  Test_Counter_Address: {
    [NetworkName.MAINNET]: '',
    [NetworkName.TESTNET]: 'EQBYLTm4nsvoqJRvs_L-IGNKwWs5RKe19HBK_lFadf19FUfb'
  }
} as const

type ContractAddressObjectKeys = keyof typeof ContractAddressObject

export function getContractAddress(name: ContractAddressObjectKeys) {
  const networkName = CURRENT_NETWORK_NAME
  const address = ContractAddressObject[name][networkName]
  if (!address) throw new Error(`Address ${name} not found`)
  return address
}
