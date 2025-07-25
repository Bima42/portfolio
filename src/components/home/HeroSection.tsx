import { useLanguage } from '../../hooks/useLanguage';

interface HeroSectionProps {
  isVisible: boolean;
}

export function HeroSection({ isVisible }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-background">
      <div className="container mx-auto px-lg">
        <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          
          {/* Main heading */}
          <div className="mb-2xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight tracking-tight">
              <div className="flex flex-col md:flex-row items-center justify-center gap-md">
                <span className="text-foreground">Tanguy</span>
                <span className="text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Pauvret
                </span>
              </div>
            </h1>

            {/* Subtitle */}
            <div className="mt-lg">
              <h2 className="text-xl md:text-2xl lg:text-3xl text-foreground/60 font-light tracking-[0.05em] text-center">
                Software Engineer
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-2xl mx-auto">
            <p className={`text-lg md:text-xl lg:text-2xl text-foreground/70 leading-relaxed text-center font-light transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              {t("pages.home.greeting")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}