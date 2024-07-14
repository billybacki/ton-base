import { Contract, ContractProvider, Sender, Address, Cell, beginCell } from '@ton/core'

export default class Counter implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  async sendIncrement(provider: ContractProvider, via: Sender) {
    const messageBody = beginCell()
      .storeUint(1, 32) // op (op #1 = increment)
      .storeUint(0, 64) // query id
      .endCell()
    await provider.internal(via, {
      value: '0.001', // send 0.002 TON for gas
      body: messageBody
    })
  }

  async getCounter(provider: ContractProvider) {
    const { stack } = await provider.get('counter', [])
    return stack.readBigNumber()
  }
}
