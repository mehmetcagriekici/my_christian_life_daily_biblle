//imports
import "../styles/styles.css";
import React from "react";
import Providers from "@/components/Providers";

/*Font Families*/
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/merriweather/400.css";
import "@fontsource/merriweather/700.css";
import "@fontsource/lora/400.css";
import "@fontsource/lora/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/cinzel/700.css"; // Bold for headings
import "@fontsource/eb-garamond/400.css"; // Regular for body
import "@fontsource/eb-garamond/700.css"; // Bold for body

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
