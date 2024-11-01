import { BottomNavigation, Footer, Header, NewsLetter } from "@/app/Sections";

export default function ShopLayout({ children }) {
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
