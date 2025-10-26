import { Button } from "@/components/ui/button"
import { MessageCircle, ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-500">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
            LUA <span className="text-3xl">🌙</span>
          </h1>
        </div>

        {/* Main Headline */}
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-fade-in-up text-balance">
          Seus Direitos,
          <br />
          Sem Barreiras
        </h2>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up text-pretty">
          Acesso simplificado a benefícios, documentos e direitos para pessoas trans. Com IA e acolhimento humano.
        </p>

        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-12 animate-fade-in-up">
          <span className="text-2xl">🔒</span>
          <span className="text-white/80 text-sm md:text-base">Espaço seguro, anônimo e gratuito</span>
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col items-center gap-6 animate-fade-in-up">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-slate-100 shadow-2xl text-lg md:text-xl px-12 py-6 md:py-7 rounded-full font-bold transition-all hover:scale-105 h-auto"
          >
            Começar Agora - É Grátis ✨
          </Button>

          {/* Secondary CTA */}
          <a
            href="#whatsapp"
            className="text-white/80 hover:text-white underline text-base md:text-lg transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Ou converse pelo WhatsApp
          </a>
        </div>

        {/* Partner Logos */}
        <div className="mt-20 animate-fade-in-up">
          <p className="text-white/60 text-sm mb-8 uppercase tracking-wider">Apoiado por:</p>
          <div className="grid grid-cols-3 gap-8 md:gap-12 max-w-2xl mx-auto items-center">
            <div className="h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white/60 text-xs font-semibold">ONG Parceira 1</span>
            </div>
            <div className="h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white/60 text-xs font-semibold">ONG Parceira 2</span>
            </div>
            <div className="h-12 bg-white/10 rounded-lg flex items-center justify-center">
              <span className="text-white/60 text-xs font-semibold">ONG Parceira 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-pulse-slow">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  )
}
