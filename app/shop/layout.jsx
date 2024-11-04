import { Footer } from "../Sections";

export default function ShopLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
