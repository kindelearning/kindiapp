import { BottomNavigation, Footer, NewsLetter } from "../Sections";

export default function NewsLetterLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          {children}
          {/* <NewsLetter /> */}
          <BottomNavigation />
          {/* <Footer /> */}
        </body>
      </html>
    </>
  );
}
