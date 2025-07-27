import { LanguageToggle, ThemeToggle } from "./molecules";

export function SimpleHeader() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center space-x-3">
      <LanguageToggle />
      <ThemeToggle />
    </div>
  );
}