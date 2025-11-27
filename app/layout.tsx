import "./globals.css";
import type { Metadata } from "next";
import Footer from "../components/footer/footer";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "../components/header/header";
import SessionWrapper from "@/components/SessionWrapper";
config.autoAddCss = false;
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';



export const metadata: Metadata = {
  title: "موسسه مصاف ایرانیان",
  description: "",
  icons: {
    icon: '@/public/icon.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      {/* <head>
        <link rel="icon" href={'@/public/icon.png'} sizes="any" />
      </head> */}
      <SessionWrapper>
        <body className="bg-[#F8F8F6] flex flex-col min-h-screen">
          <ToastContainer />
          <Header />
          <div className="flex-grow py-4">
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                {children}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </div>
          <Footer />
        </body>
      </SessionWrapper>


    </html>
  );
}
