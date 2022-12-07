import { Inter } from '@next/font/google'

import type { AppProps } from 'next/app'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-inter'
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={`${inter.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
