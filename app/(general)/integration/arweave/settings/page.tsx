'use client'
import { ConnectArweaveWallet } from '@/integrations/arweave/components/connect-arweave-wallet'
import { useArweaveWallet } from '@/integrations/arweave/hooks/use-arweave-wallet'

export default function ArweaveSettingsPage() {
  const { wallet, disconnect, address, backupWallet } = useArweaveWallet()
  if (!wallet) return <ConnectArweaveWallet />
  return (
    <div>
      <h4 className="mb-2">
        Connected to <span className="font-mono">{address}</span>
      </h4>
      <div>
        <button className="btn btn-primary mr-2 text-sm" onClick={() => backupWallet()}>
          backup keyfile
        </button>
        <button className="btn btn-primary text-sm" onClick={() => disconnect()}>
          disconnect
        </button>
      </div>
    </div>
  )
}
