import { getDictionary } from '@/lib/intl/dictionaries'

import "./globals.css";

export const metadata = {
  title: "Erasmiana Rotterdam Bibliotheek",
  description: "A Digital AI Erasmus Debate",
};

export default async function RootLayout({ params, children }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <html lang="en">
      <body className="bg-[#ddeef5]">
        {children}
      </body>
    </html>
  );
}
