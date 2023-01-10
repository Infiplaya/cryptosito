// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { ThemeProvider } from "next-themes";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { Footer } from "../modules/common/components/Footer";
import Header from "../modules/common/components/Header";
import { Inter } from "@next/font/google";
import { Container } from "../modules/common/components/Container";

config.autoAddCss = false;

const inter = Inter({
  variable: "--font-inter",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <main className={inter.className}>
          <Container>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </Container>
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
