import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface BlockContextType {
  block: number | undefined
  setBlock?: (name: string) => void
}

const Blocks = createContext<BlockContextType>({
  block: 1
})

export const useBlockNumber = () => {
  const content = useContext(Blocks)
  if (!content) {
    throw new Error('useBlockNumber must be used within a Blocks Provider')
  }
  return content.block
}

export default function SSEProvider({ children }: { children: ReactNode }) {
  const [block, setBlock] = useState()

  useEffect(() => {
    function connectToSSE(url: string, retryInterval: number = 5000): void {
      let eventSource: EventSource | null = null

      const connect = () => {
        eventSource = new EventSource(url)

        eventSource.onmessage = (event: MessageEvent) => {
          const data: any = JSON.parse(event.data)
          setBlock(data?.seqno)
        }

        eventSource.onerror = () => {
          console.error('SSE connection error. Attempting to reconnect...')
          eventSource?.close()
          eventSource = null

          setTimeout(connect, retryInterval)
        }

        eventSource.onopen = () => {
          console.log('SSE connection opened')
        }
      }

      connect()
    }

    connectToSSE(`https://tonapi.io/v2/sse/blocks?workchain=0`)
  }, [])

  return <Blocks.Provider value={{ block }}>{children}</Blocks.Provider>
}
