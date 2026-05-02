import { useState } from 'react'

function GameImage({ src, alt, className = '', fallbackText = 'Image not found' }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={`${className} bg-[#1A1F2E] flex items-center justify-center`}>
        <div className="text-center p-4">
          <svg className="w-12 h-12 text-[#A0A0A0] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[#A0A0A0] text-sm">{fallbackText}</span>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  )
}

export default GameImage
