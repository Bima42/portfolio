function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Portfolio Setup
        </h1>
        <p className="text-gray-600 mb-6">
          Test des couleurs Tailwind
        </p>
        
        {/* Test simple et visible */}
        <div className="space-y-4 mb-8">
          <div className="bg-primary p-6 rounded-lg">
            <p className="text-foreground font-bold">Primary: #C6BCF0 (lilas)</p>
          </div>
          <div className="bg-secondary p-6 rounded-lg">
            <p className="text-white font-bold">Secondary: #6100FF (violet)</p>
          </div>
          <div className="bg-foreground p-6 rounded-lg">
            <p className="text-background font-bold">Foreground: #0F0F0F (noir)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App