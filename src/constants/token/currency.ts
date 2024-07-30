import JSBI from 'jsbi'
import { validateSolidityTypeInstance } from '../utils'
import { SolidityType } from '../constants'
import { Address } from '@ton/core'
import invariant from 'tiny-invariant'

export const ZERO_ADDRESS = '0:0000000000000000000000000000000000000000000000000000000000000000'

export class Currency {
  public readonly address: Address
  public readonly decimals: number
  public readonly symbol?: string
  public readonly name?: string
  public logo?: string

  // private static readonly defaultETHER: Currency = new Currency(ZERO_ADDRESS, 9, 'TON')
  /**
   * Constructs an instance of the base class `Currency`.
   * @param decimals decimals of the currency
   * @param symbol symbol of the currency
   * @param name of the currency
   */
  constructor(address: string, decimals: number, symbol?: string, name?: string, logo?: string) {
    validateSolidityTypeInstance(JSBI.BigInt(decimals), SolidityType.uint8)

    const addr = Address.parse(address)
    invariant(Address.isAddress(addr), `${address} is not a Address.`)

    this.address = addr
    this.decimals = decimals
    this.symbol = symbol
    this.name = name
    this.logo = logo
  }

  public static getNativeCurrency(decimals?: number) {
    return new Currency(
      ZERO_ADDRESS,
      decimals ? decimals : 9,
      'TON',
      'Toncoin',
      'https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png'
    )
  }

  public equals(other: Currency): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.address === other.address
  }

  public get isNative() {
    return this.address.toRawString() === ZERO_ADDRESS
  }

  public setLogo(logo: string) {
    this.logo = logo
  }
}
