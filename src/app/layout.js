import "./globals.css";
import {getAuthSession} from "@/lib/auth";
import SessionProvider from "@/components/providers/SessionProvider";

export const metadata = {
  title: "Farmers Registry - RDA",
  description: "RDA - Farmers Registry",
};

export default async function RootLayout({ children }) {
  const session = await getAuthSession();
  return (
    <html lang="en">
      <body>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}
