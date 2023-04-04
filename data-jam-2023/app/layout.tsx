import './globals.css'

export const metadata = {
  title: 'Summit Datajam 2023',
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
