//import { Inter } from "next/font/google";
import "./globals.css";

/*const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  fallback: ["Arial", "Times New Roman"],
  weight: ["400", "500", "600", "700", "800"],
});
*/

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="Arial">{children}</body>
    </html>
  );
}