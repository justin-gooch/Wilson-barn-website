import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "./components/main_header/main_header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Wilson Barn",
  description: "A historic community space",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="page">
        <MainHeader />
        <div id='main-body'>
        {children}


        </div>
        </div>
      </body>
    </html>
  );
}
