import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="http://localhost:3000" async></script>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+icons"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
