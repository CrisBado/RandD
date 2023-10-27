import "src/app/globals.css";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

import "@radix-ui/themes/styles.css";

export const metadata = {
  title: "Glossary",
  // description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
