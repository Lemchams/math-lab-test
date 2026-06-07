import './globals.css';

export const metadata = {
  title: 'La Fabrique des Nombres',
  description: 'Module interactif de numération de position pour MathLab.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-[#f4efe8] text-slate-900 antialiased">{children}</body>
    </html>
  );
}
