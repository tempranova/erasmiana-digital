import Script from 'next/script'
import { ToastContainer } from 'react-toastify';
import Link from 'next/link';

import Logo2 from '@/components/nav/logo2';
import SideNav from '@/components/nav/side-nav'

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
        <link href="https://fonts.googleapis.com/css2?family=Ovo&family=Cardo:ital,wght@0,400;0,700;1,400&family=IM+Fell+DW+Pica:ital@0;1&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`im-fell-dw-pica-regular m-0 p-0 flex flex-col min-h-screen antialiased bg-cover bg-no-repeat bg-center bg-[url('/assets/painting-bg-3.png')]`}
      >
        {children}
        <div className="w-full h-[120px] bg-cover bg-top bg-center bg-[url('/assets/edge-3.png')] p-8">
          <div className="m-auto mt-6 text-3xl text-center flex items-center justify-center gap-4">
            <div className="ml-auto text-[#3b2d2b] im-fell-dw-pica-regular-italic cursor-pointer hover:underline underline-offset-4 decoration-2">Debate</div>
            <div className="ml-auto text-[#3b2d2b] im-fell-dw-pica-regular-italic cursor-pointer hover:underline underline-offset-4 decoration-2">Learn</div>
            <div className="ml-auto text-[#3b2d2b] im-fell-dw-pica-regular-italic cursor-pointer hover:underline underline-offset-4 decoration-2">Data</div>
            <Link className="m-auto w-[50px]" href="/preface"><img src="/assets/letter-e-black.png" /></Link>
            <div className="mr-auto text-[#3b2d2b] im-fell-dw-pica-regular-italic cursor-pointer hover:underline underline-offset-4 decoration-2">Search</div>
            <div className="mr-auto text-[#3b2d2b] im-fell-dw-pica-regular-italic cursor-pointer hover:underline underline-offset-4 decoration-2">Works</div>
            <div className="mr-auto text-[#3b2d2b] im-fell-dw-pica-regular-italic cursor-pointer hover:underline underline-offset-4 decoration-2">Letters</div>
          </div>
        </div>
      </body>
    </html>
  );
}

              // <Logo2 minimized={false} />
        // <div className="min-h-screen">
        //   <SideNav />
        //   <div className="ml-[170px]">
        //     {children}
        //   </div>
        // </div>
        // <ToastContainer />
        // <audio id="erasmusAudio" loop>
        //   <source src="/audio/ave-maria.mp3" type="audio/mpeg" />
        //   Your browser does not support the audio element.
        // </audio>