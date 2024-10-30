import { useEffect } from 'react'

export default function LoaderQuantum() {
  useEffect(() => {
    async function getLoader() {
      const { quantum } = await import('ldrs')
      quantum.register()
    }
    getLoader()
  }, [])
  return <div className="flex items-center justify-center min-h-screen">
    <l-quantum
      size="25"
      speed="1.75"
      color="#FC7B54"
    ></l-quantum>
  </div>
}
