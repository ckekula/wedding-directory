import { useEffect } from 'react'

export default function LoaderTrio() {
  useEffect(() => {
    async function getLoader() {
      const { trio } = await import('ldrs')
      trio.register()
    }
    getLoader()
  }, [])
  return <div className="flex items-center justify-center min-h-screen">
    <l-trio
      size="25"
      speed="1.75"
      color="#FC7B54"
    ></l-trio>
  </div>
}
