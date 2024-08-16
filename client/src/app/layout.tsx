"use client"

import { Inter } from "next/font/google";
import "./globals.css";

import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from "react-hot-toast";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'  
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'



const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={"733987111751-um6k4ikd9m38qfvhk9ansu8hv2skibfn.apps.googleusercontent.com"}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster/>
          </ThemeProvider>
          </GoogleOAuthProvider>
          <ReactQueryDevtools/>
          </QueryClientProvider>
      </body>
    </html>
  );
}
