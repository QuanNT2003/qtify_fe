import { Button } from "@/components/ui/button";

export default function TestShadcnPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <h1 className="text-4xl font-bold">Shadcn UI Test Page</h1>
      <p className="text-muted-foreground text-center max-w-md">
        If you can see the buttons below with proper styling, Shadcn UI and
        Tailwind CSS 4 are correctly configured.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button>Default Button</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}
