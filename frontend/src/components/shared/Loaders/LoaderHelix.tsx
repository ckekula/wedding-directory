'use client';
import { useEffect } from 'react'

export default function LoaderHelix() {
  useEffect(() => {
    async function getLoader() {
      const { helix } = await import('ldrs')
      helix.register()
    }
    getLoader()
  }, [])
  return <div className="flex items-center justify-center min-h-screen">
    <l-helix
      size="25"
      speed="1.75"
      color="#FC7B54"
    ></l-helix>
  </div>
}
