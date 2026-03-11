import { Inter } from "next/font/google";
import "../styles/main.scss";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata = {
  title: "Creative Developer Portfolio",
  description: "A showcase of modern web experiences and software engineering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
