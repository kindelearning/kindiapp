import "../globals.css";
import { BottomNavigation, Footer, Header, NewsLetter } from "../Sections";

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          {/* <Header className="sticky" /> */}
          {children}
          <NewsLetter />
          <BottomNavigation />
          <Footer />
        </body>
      </html>
    </>
  );
}
