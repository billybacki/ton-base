import { Currency } from '@/constants/token/currency'
import { CurrencyAmount } from '@/constants/token/currencyAmount'
import { useJettonBalance, useTonBalance } from '@/hooks/useBalance'
import { useCounterContract } from '@/hooks/useCounterContract'
import { useJettonTransfer, useTonTransfer } from '@/hooks/useTransfer'
import { shortenHash } from '@/utils'
import { Button, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import { TonConnectButton, useTonAddress, useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react'

const testJetton = 'kQAiboDEv_qRrcEdrYdwbVLNOXBHwShFbtKGbQVJ2OKxY_Di'

export default function Test1() {
  const tonConnectModal = useTonConnectModal()
  const tonConnectUI = useTonConnectUI()
  const address = useTonAddress()
  const tonTransfer = useTonTransfer()
  const jettonTransfer = useJettonTransfer(testJetton)
  const balance = useJettonBalance(testJetton)
  console.log('🚀 ~ Test1 ~ balance:', balance)
  const tonBalance = useTonBalance(address)
  console.log('🚀 ~ Test1 ~ tonBalance:', tonBalance)
  const currency = Currency.getNativeCurrency()
  console.log(
    '🚀 ~ Test1 ~ balance:',
    balance,
    CurrencyAmount.fromRawAmount(currency, tonBalance || '').toSignificant()
  )

  const { value: counterValue, contractAddress, sendIncrement } = useCounterContract()

  return (
    <Container maxWidth="lg">
      <Stack spacing={20} padding={20} alignItems={'center'}>
        <TonConnectButton />
        {address ? (
          <Button variant="outlined" onClick={tonConnectUI?.[0].disconnect}>
            Disconnect
          </Button>
        ) : (
          <Button fullWidth variant="contained" onClick={tonConnectModal.open}>
            Connect
          </Button>
        )}
        <Button variant="outlined">Account: {address ? shortenHash(address) : '-'}</Button>

        <Divider />
        <Paper sx={{ pointerEvents: address ? 'auto' : 'none', padding: 20, width: 300 }}>
          <Stack spacing={15}>
            <Typography>Contract Address: {contractAddress}</Typography>
            <Typography>Counter value: {counterValue}</Typography>
            <Button variant="contained" onClick={sendIncrement}>
              SendIncrement
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                tonTransfer(0.1, 'UQD0bGj31-3J1_JPn4nlTiQDfEpDqzZhAtZK81ocfp35ED6I', 'this is test')
              }}
            >
              Send 0.1 TonCoin
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                jettonTransfer(BigInt(1000000), 'UQD0bGj31-3J1_JPn4nlTiQDfEpDqzZhAtZK81ocfp35ED6I')
              }}
            >
              Send Jetton
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
