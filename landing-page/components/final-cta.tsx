import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-purple-600 to-pink-600 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Pronta(o) para Começar? 🚀</h2>
        <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed text-pretty">
          Junte-se a centenas de pessoas que já estão acessando seus direitos com dignidade.
        </p>

        <Button
          size="lg"
          className="bg-white text-purple-600 hover:bg-slate-100 shadow-2xl text-xl md:text-2xl px-16 py-7 md:py-8 rounded-full font-bold transition-all hover:scale-105 h-auto mb-6"
        >
          Começar Gratuitamente ✨
        </Button>

        <div className="flex flex-col items-center gap-4">
          <a
            href="#whatsapp"
            className="text-white/80 hover:text-white underline text-lg md:text-xl transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Ou converse pelo WhatsApp
          </a>

          <p className="text-white/60 text-sm mt-4">Sem cartão de crédito • Sem compromisso • Apenas respeito 💜</p>
        </div>
      </div>
    </section>
  )
}
