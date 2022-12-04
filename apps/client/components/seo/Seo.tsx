import Head from 'next/head'

const DOMAIN = 'https://icerty.com'

const description =
  "E-commerce platforms in Poland. The portal belongs to Icerty Sp. z o. o., owned by three investment funds - Mid Europa Partners. The site was listed in Alex's post at 259"
const siteName = 'Icerty'
const canonical = DOMAIN
const ogType = 'website'

interface Props {
  readonly title?: string
}

const Seo = ({ title }: Props) => {
  return (
    <Head>
      <title key='title'>{`${title ?? siteName}`}</title>
      <meta name='description' content={description} />
      <meta key='og_type' property='og:type' content={ogType} />
      <meta key='og_title' property='og:title' content={title} />
      <meta key='og_description' property='og:description' content={description} />
      <meta key='og_locale' property='og:locale' content='pl_PL' />
      <meta key='og_site_name' property='og:site_name' content={siteName} />
      <meta key='og_url' property='og:url' content={canonical ?? DOMAIN} />
      <meta key='og_site_name' property='og:site_name' content={siteName} />
      <meta key='og_image:alt' property='og:image:alt' content={`${title} | ${siteName}`} />
      <meta key='og_image:width' property='og:image:width' content='1200' />
      <meta key='og_image:height' property='og:image:height' content='630' />
      <meta name='robots' content='index,follow' />

      <link rel='shortcut icon' href='/favicon.ico' />
    </Head>
  )
}

export default Seo
