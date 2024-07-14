import { useCounterContract } from '@/hooks/useCounterContract'
import { shortenHash } from '@/utils'
import { Button, Container, Divider, Paper, Stack, Typography } from '@mui/material'
import { TonConnectButton, useTonAddress, useTonConnectModal, useTonConnectUI } from '@tonconnect/ui-react'

export default function Test1() {
  const tonConnectModal = useTonConnectModal()
  const tonConnectUI = useTonConnectUI()
  const address = useTonAddress()

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
          </Stack>
        </Paper>
      </Stack>
    </Container>
  )
}
