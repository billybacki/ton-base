import { Dots } from '@/components/Global'
import { Container, Paper, styled } from '@mui/material'

const Title = styled('p')(`
  font-weight: 500;
  font-size: 24px;
  line-height: 88.69%;
`)

export default function ComingSoon() {
  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          padding: 10,
          textAlign: 'center'
        }}
      >
        <Title>
          Coming Soon <Dots />
        </Title>
        <div>This section is still implemeting.</div>
        <div>Please come back later</div>
      </Paper>
    </Container>
  )
}
