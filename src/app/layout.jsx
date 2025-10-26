import Script from 'next/script'
import { ToastContainer } from 'react-toastify';

import Logo from '@/components/nav/logo'

import "./globals.css";

export const metadata = {
  title: "Erasmiana",
  description: "A Digital Collection of the works of Erasmus of Rotterdam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cardo:ital,wght@0,400;0,700;1,400&family=IM+Fell+DW+Pica:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`im-fell-dw-pica-regular antialiased`}
      >
        <ToastContainer />
        <Logo margin={true} id="erasmiana-logo-fixed" />
        <div id="animator" className="animator-fader fade h-full">
          {children}
        </div>
        <audio id="erasmusAudio" loop>
          <source src="/audio/ave-maria.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </body>
      <Script src="/scripts/animate.js" />
    </html>
  );
}
