export default function Head({ params }: { readonly params: { readonly slug: string } }) {
  return (
    <>
      <title key='title'>{`${params.slug ?? 'Icerty'}`}</title>
      <meta
        name='description'
        content="E-commerce platforms in Poland. The portal belongs to Icerty Sp. z o. o., owned by three investment funds - Mid Europa Partners. The site was listed in Alex's post at 259"
      />
      <link rel='shortcut icon' href='/favicon.ico' />
    </>
  )
}
