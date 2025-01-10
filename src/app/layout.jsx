import { Geist, Geist_Mono } from "next/font/google";
import localfont from "next/font/local"
import "./globals.css";
import ClientSessionProvider from "@/components/ui/ClientSessionProvider";// Import the client component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const aileron = localfont({
  src: [

    {
      path: '../../public/fonts/Aileron-Regular.otf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Aileron-Black.otf',
      weight: '900',
    },
    {
      path: '../../public/fonts/Aileron-SemiBold.otf',
      weight: '600',
    },
    {
      path: '../../public/fonts/Aileron-Bold.otf',
      weight: '700',
    }
  ],

  variable: '--font-aileron'
})

export const metadata = {
  title: "Techzone.",
  description: "Giving electronics a second life, delivered to you.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${aileron.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap children with ClientSessionProvider */}
        <ClientSessionProvider>{children}</ClientSessionProvider>
      </body>
    </html>
  );
}
