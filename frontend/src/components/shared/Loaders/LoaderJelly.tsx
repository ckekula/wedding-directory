'use client'

import { useEffect } from 'react'

export default function LoaderJelly() {
  useEffect(() => {
    async function getLoader() {
      const { jellyTriangle } = await import('ldrs')
      jellyTriangle.register()
    }
    getLoader()
  }, [])
  return <div className="flex items-center justify-center min-h-screen">
    <l-jelly-triangle
      size="25"
      speed="1.75"
      color="#FC7B54"
    ></l-jelly-triangle>
  </div>
}
