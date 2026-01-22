
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center bg-background p-4">
      <h1 className="text-2xl font-bold">Login Removed</h1>
      <p className="text-muted-foreground">This portfolio is now public and no longer requires a login.</p>
      <Button asChild>
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
