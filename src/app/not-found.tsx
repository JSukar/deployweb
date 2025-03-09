import Link from 'next/link'
import Spline from '@splinetool/react-spline'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white">
      <div className="w-full max-w-[800px] h-[500px] mb-8">
        <Spline scene="/3d/error_404.spline" />
      </div>
      
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-block px-6 py-3 rounded-full bg-black text-white font-semibold border border-white/20 hover:bg-white/10 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  )
} 