import { info } from '@/svgs/commonSvgs'
import React from 'react'

export default function Power() {
  return (
    <div className="flex flex-col z-20 gap-y-1 rounded-2xl bg-gray24/60 py-4">
    <div className="flex justify-between items-center px-2 text-sm">
      <p className="gap-1 flex items-center ">Unicorn Power{info}</p>
      <span>0</span>
      </div>
      </div>
  )
}
