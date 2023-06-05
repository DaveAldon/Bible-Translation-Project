import Head from 'next/head'
import Navbar from './components/Navbar/Navbar'
import './globals.css'

const meta = {
  title: 'The Bible Translation Project',
  description:
    'Understand and find the origins of your favorite Bible translations',
  url: 'https://bibletranslationproject.org',
  image: 'https://www.bibletranslations.org/assets/images/about-banner.png',
  author: 'David Crawford',
  type: 'website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        {/* <!-- Google / Search Engine Tags -->
         */}
        <meta itemProp="name" content={meta.title} />
        <meta itemProp="description" content={meta.description} />
        <meta itemProp="image" content={meta.image} />
        {/* <!-- Facebook Meta Tags -->
         */}
        <meta property="og:url" content={`https://bibletranslations.org`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        {/* <!-- Twitter Meta Tags -->
         */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />'
      </Head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
