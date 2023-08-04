'use client'

import { useState } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { GeneralInfo } from '@/integrations/aave/components/general-info'
import { ListAssetsToBorrow } from '@/integrations/aave/components/list-assets-to-borrow'
import { ListAssetsToSupply } from '@/integrations/aave/components/list-assets-to-supply'
import { ListBorrowedAssets } from '@/integrations/aave/components/list-borrowed-assets'
import { ListSuppliedAssets } from '@/integrations/aave/components/list-supplied-assets'

export default function AaveHome() {
  const [actionSelected, setActionSelected] = useState('supply')

  return (
    <section className="w-full lg:mt-10">
      <div className="mx-auto max-w-screen-xl">
        <GeneralInfo />
        <div className="mb-5 ml-4 w-40">
          <Select value={actionSelected} onValueChange={(action) => setActionSelected(action)}>
            <SelectTrigger className="input mt-2 bg-white text-gray-600 placeholder:text-neutral-400 dark:bg-gray-700 dark:text-slate-300 dark:placeholder:text-neutral-400">
              <SelectValue placeholder="Select market" />
            </SelectTrigger>
            <SelectContent className="w-56 bg-white dark:bg-gray-700">
              <SelectItem value="supply">
                <div className="flex items-center justify-between">Supply</div>
              </SelectItem>
              <SelectItem value="borrow">
                <div className="flex items-center justify-between">Borrow</div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mb-4 flex justify-between space-x-4 dark:text-white">
          <div className={`${actionSelected === 'supply' ? '' : 'hidden'} w-full xl:block`}>
            <ListSuppliedAssets />
          </div>
          <div className={`${actionSelected === 'borrow' ? '' : 'hidden'} w-full xl:block`}>
            <ListBorrowedAssets />
          </div>
        </div>

        <div className="flex justify-between space-x-4 dark:text-white ">
          <div className={`${actionSelected === 'supply' ? '' : 'hidden'} w-full xl:block`}>
            <ListAssetsToSupply />
          </div>
          <div className={`${actionSelected === 'borrow' ? '' : 'hidden'} w-full xl:block`}>
            <ListAssetsToBorrow />
          </div>
        </div>
      </div>
    </section>
  )
}