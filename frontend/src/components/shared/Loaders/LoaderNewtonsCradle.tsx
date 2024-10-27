import { useEffect } from 'react'

export default function LoaderNewtonsCradle() {
  useEffect(() => {
    async function getLoader() {
      const { newtonsCradle } = await import('ldrs')
      newtonsCradle.register()
    }
    getLoader()
  }, [])
  return <div className="flex items-center justify-center min-h-screen">
    <l-newtons-cradle
      size="25"
      speed="1.75"
      color="#FC7B54"
    ></l-newtons-cradle>
  </div>
}
