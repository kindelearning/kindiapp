import { ShopHeader } from "@/app/Sections";

export default function CartLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          <ShopHeader className="sticky" />
          {children}
        </body>
      </html>
    </>
  );
}
