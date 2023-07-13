import { useEffect, useState } from 'react'

import CopyToClipboard from 'react-copy-to-clipboard'
import { HiUser } from 'react-icons/hi'

import { Loadable } from './loadable'
import { SubscribeButton } from './subscribe-button'
import { ChannelCardProps } from './types'
import { useChannel } from '../hooks'
import { truncateAddress } from '../utils/helpers'

function strLimit(text: string, count: number) {
  return text.slice(0, count) + (text.length > count ? '...' : '')
}

export function ChannelCard(props: ChannelCardProps) {
  const { env, channelAddress, onSubscribe, onUnsubscribe } = props
  const {
    data: channel,
    isLoading: channelIsLoading,
    error,
  } = useChannel({
    channel: channelAddress,
    env: env,
  })

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    setTimeout(() => setCopied(false), 3000)
  }, [copied])

  if (error) return <>Error loading channel...</>

  return (
    <Loadable isLoading={channelIsLoading}>
      {channel && (
        <div className="flex w-full space-x-4">
          <div className="flex flex-col">
            <img alt={channel.name} className="w-24 md:w-32" src={channel.icon} />
          </div>
          <div className="flex grow flex-col">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xl">{channel.name}</p>
            <p className="hidden text-xs md:block">{strLimit(channel.info, 100)}</p>
            <div className="mt-auto">
              <div className="mt-2 flex flex-col items-start space-y-2 md:flex-row md:items-end md:space-y-0 md:space-x-2">
                <SubscribeButton channelAddress={channelAddress} env={env} onSubscribe={onSubscribe} onUnsubscribe={onUnsubscribe} />
                <div className="flex space-x-2">
                  <div className="flex space-x-1 rounded-full bg-pink-200 px-2 py-1 text-xs text-pink-600">
                    <HiUser />
                    <div>{channel.subscriber_count}</div>
                  </div>
                  <CopyToClipboard text={channel.channel} onCopy={() => setCopied(true)}>
                    <button className="rounded-full bg-slate-200 px-2 py-1 text-xs text-gray-700">
                      {copied ? <>Copied!</> : <>{truncateAddress(channel.channel)}</>}
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Loadable>
  )
}
