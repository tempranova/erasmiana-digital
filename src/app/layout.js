import "./globals.css";

export const metadata = {
  title: "Life of Erasmus",
  description: "A map of Desiderius Erasmus's Life & Influence",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
