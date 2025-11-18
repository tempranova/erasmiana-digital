import BottomNav from '@/components/nav/bottom-nav';

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
      <body className="im-fell-dw-pica-regular m-0 p-0 pb-16 lg:flex lg:flex-col lg:min-h-screen antialiased bg-cover bg-no-repeat bg-center bg-[url('/assets/painting-bg-3.png')]">
        {children}
        <BottomNav />
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