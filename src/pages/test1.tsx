import { Button, Container, Stack } from '@mui/material'
import { TonConnectButton } from '@tonconnect/ui-react'

export default function Test1() {
  return (
    <Container maxWidth="lg">
      <Stack spacing={20} padding={20} alignItems={'center'}>
        <Button fullWidth variant="contained">
          button
        </Button>
        <TonConnectButton />
      </Stack>
    </Container>
  )
}
