import { useTheme } from '../hooks/useTheme'

export default function Home() {
  const { theme, isDark } = useTheme()
  
  return (
    <div className="min-h-screen bg-background pt-3xl">
      <div className="container mx-auto px-lg py-2xl max-w-container-lg">
        <h1 className="text-4xl font-bold text-foreground mb-xl">Accueil</h1>
        
        <div className="grid gap-lg mb-2xl">
          <div className="bg-primary p-xl rounded-xl">
            <h2 className="text-foreground font-bold mb-md">Test Dark Mode</h2>
            <p className="text-foreground/80">Mode actuel: <strong>{theme}</strong></p>
            <p className="text-foreground/80">isDark: <strong>{isDark ? 'true' : 'false'}</strong></p>
          </div>
          
          <div className="bg-secondary p-lg rounded-lg">
            <p className="text-white font-bold">Couleur secondaire</p>
            <p className="text-white/80">Devrait changer en mode sombre</p>
          </div>
          
          <div className="bg-foreground p-md rounded-md">
            <p className="text-background font-bold">Contraste inversé</p>
            <p className="text-background/80">Texte sur fond foreground</p>
          </div>
        </div>
        
        {/* Cards avec variations dark: */}
        <div className="grid md:grid-cols-2 gap-lg">
          <div className="bg-white dark:bg-gray-800 p-xl rounded-xl border">
            <h3 className="text-gray-900 dark:text-white font-bold mb-md">Tailwind dark: variant</h3>
            <p className="text-gray-600 dark:text-gray-300">Cette carte utilise les classes dark: de Tailwind</p>
          </div>
          
          <div className="bg-primary/20 dark:bg-primary/10 p-xl rounded-xl">
            <h3 className="text-foreground font-bold mb-md">Variables CSS</h3>
            <p className="text-foreground/70">Cette carte utilise les variables CSS custom</p>
          </div>
        </div>
      </div>
    </div>
  )
}