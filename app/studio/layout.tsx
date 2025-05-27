export const metadata = {
  title: 'E-Commerce App',
    description: 'An e-commerce application built with Next.js and Clerk',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}