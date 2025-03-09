'use client'

import FloatingNav from '@/components/FloatingNav'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-black">
      <FloatingNav />
      {children}
    </main>
  )
} 