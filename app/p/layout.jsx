import "../globals.css";
import { cn } from "@/lib/utils";
import { BottomNavigation, Footer, Header, NewsLetter } from "../Sections";

export const metadata = {
  title: "Kindi Education",
  description: "Built by ClaraVerse",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <Header className="sticky" />
          {children}
          <NewsLetter />
          <BottomNavigation />
          <Footer />
        </body>
      </html>
    </>
  );
}
