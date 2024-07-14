import { NetworkName } from './addresses'

export const CURRENT_NETWORK_NAME: NetworkName = import.meta.env.VITE_PUBLIC_NETWORK_NAME || 'mainnet'
