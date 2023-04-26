import './globals.css'

export const metadata = {
  title: 'Mental Health Treatment in DC - Maryland - Virginia (DMV)',
  description: 'Created by the Data Science team at Summit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
