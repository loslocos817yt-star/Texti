import "./globals.css";

export const metadata = {
  title: "Textit | PattitexTEC",
  description: "Red social full texto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#f0f2f5] min-h-screen">{children}</body>
    </html>
  );
}
