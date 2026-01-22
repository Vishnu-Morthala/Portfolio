export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex h-20 flex-col items-center justify-center gap-2 px-4 text-center md:h-16 md:flex-row md:justify-between md:px-6">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Portfolify. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with Next.js and Firebase.
        </p>
      </div>
    </footer>
  );
}
