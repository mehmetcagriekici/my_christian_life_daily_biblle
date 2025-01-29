//imports
import "../styles/styles.css";
import React, { Suspense } from "react";
import Providers from "@/components/Providers";
import Loading from "@/app/Loading";

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
        <Suspense fallback={<Loading />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
