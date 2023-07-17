import { useState } from 'react'

import Image from 'next/image'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdHorizontalRule } from 'react-icons/md'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export const ListBorrowedAssets = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const handleCollapseClick = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="flex-1 rounded border p-3 dark:border-slate-600">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-bold">Your Borrows</h2>
        <button className="flex items-center" onClick={handleCollapseClick}>
          <span className="mr-2">{isCollapsed ? 'Hide' : 'Show'}</span>
          {isCollapsed ? <MdHorizontalRule size={20} /> : <AiOutlinePlus size={20} />}
        </button>
      </div>
      <div className="flex items-center">
        <div className="mr-2 rounded border bg-white py-2 px-4 dark:border-slate-600 dark:bg-gray-800">
          <h3 className="text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-300"> Balance $ </span>4.00
          </h3>
        </div>
        <div className="mr-2 rounded border bg-white py-2 px-4 dark:border-slate-600 dark:bg-gray-800">
          <h3 className="text-xs font-bold">
            <span className="text-slate-500 dark:text-slate-300">APY</span> 2.5 <span className="text-slate-500 dark:text-slate-300">%</span>
          </h3>
        </div>
        <div className="mr-2 rounded border bg-white py-2 px-4 dark:border-slate-600 dark:bg-gray-800">
          <h3 className="text-xs font-bold">
            {' '}
            <span className="text-slate-500 dark:text-slate-300">Borrow power used</span> 65
            <span className="text-slate-500 dark:text-slate-300"> %</span>
          </h3>
        </div>
      </div>
      {isCollapsed && (
        <div className="overflow-x-auto">
          <table className="mt-7 w-full table-auto border-collapse text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 text-xs text-slate-500 dark:text-slate-300">Asset</th>
                <th className="px-4 py-2 text-xs text-slate-500 dark:text-slate-300">Balance</th>
                <th className="px-4 py-2 text-xs text-slate-500 dark:text-slate-300">APY</th>
                <th className="px-4 py-2 text-xs text-slate-500 dark:text-slate-300">APY Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mt-2 flex items-center px-4 py-2">
                  <Image alt="Ethereum" className="mr-2 rounded-full" height={25} src="/integrations/connext/logos/chains/ethereum.png" width={25} />
                  ETH
                </td>
                <td className="px-4 py-2">1.0121</td>
                <td className="px-4 py-2">3%</td>
                <td className="px-4 pb-2">
                  <Select value="ethereum">
                    <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent className="w-56 bg-white dark:bg-gray-700">
                      <SelectItem value="ethereum">
                        <div className="flex items-center justify-between">Variable</div>
                      </SelectItem>
                      <SelectItem value="asdf">
                        <div className="flex items-center justify-between">Stable</div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-2">
                  <Button className="mr-2">Repay</Button>
                  <Button>Borrow</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
