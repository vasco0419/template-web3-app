import { useCallback, useMemo, useState } from 'react'

import { Player, useAssetMetrics, useCreateAsset } from '@livepeer/react'
import { useDropzone } from 'react-dropzone'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export const Asset = () => {
  const [video, setVideo] = useState<File | undefined>()
  const [playbackId, setPlaybackId] = useState<string>('')
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }] as const,
        }
      : null
  )
  const { data: metrics } = useAssetMetrics({
    assetId: asset?.[0].id,
    refetchInterval: 30000,
  })

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'video/*': ['.mp4'],
    },
    maxFiles: 1,
    onDrop,
  })

  const isLoading = useMemo(() => status === 'loading' || (asset?.[0] && asset[0].status?.phase !== 'ready'), [status, asset])

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting...'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress]
  )

  return (
    <div className="card w-full">
      <div>
        {!asset && (
          <div
            className={cn(
              'transition-border flex flex-1 flex-col items-center rounded border-2 border-dashed border-[#eeeeee] bg-[#fafafa] p-4 text-[#bdbdbd] outline-none duration-150 ease-in-out',
              isFocused && 'border-[#2196f3]',
              isDragAccept && 'border-[#00e676]',
              isDragReject && 'border-[#ff1744]'
            )}
            {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop or browse files</p>

            {error?.message && <p>{error.message}</p>}
          </div>
        )}

        {asset?.[0]?.playbackId && (
          <div className="relative z-0 mt-4 flex h-80 w-full justify-items-center rounded border-4 p-2">
            {' '}
            <Player title={asset[0].name} playbackId={asset[0].playbackId} />{' '}
          </div>
        )}

        <div className="flex flex-col justify-items-center">
          {metrics?.metrics?.[0] && <p className="mt-2">Views: {metrics?.metrics?.[0]?.startViews}</p>}

          {video ? <p className="mt-2">{video.name}</p> : <p className="mt-2">Select a video file to upload.</p>}

          {progressFormatted && <p className="mt-2">{progressFormatted}</p>}

          {!asset?.[0].id && (
            <Button
              className="mt-2"
              onClick={() => {
                createAsset?.()
              }}
              disabled={isLoading || !createAsset}>
              Upload
            </Button>
          )}
        </div>
      </div>
      <div className="my-5 text-center ">OR</div>
      <div className="flex flex-col justify-items-center">
        <label>
          Enter playback Id
          <Input className="mt-2" value={playbackId} onChange={(e) => setPlaybackId(e.target.value)} placeholder="PlaybackId from studio goes here" />
        </label>
        {playbackId && (
          <div className="relative z-0 mt-4 flex h-80 w-full justify-items-center rounded border-4 p-2">
            <Player playbackId={playbackId} />
          </div>
        )}
      </div>
    </div>
  )
}
