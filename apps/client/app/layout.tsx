export default function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
