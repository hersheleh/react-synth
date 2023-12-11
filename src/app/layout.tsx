import './global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:3000"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
