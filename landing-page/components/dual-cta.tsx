import { Button } from "@/components/ui/button"

export function DualCTA() {
  return (
    <section className="py-0 bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
        {/* NGO Section */}
        <div className="bg-purple-600 text-white p-12 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Você é de uma ONG?</h2>
          <p className="text-xl mb-8 text-white/90">Junte-se à nossa rede de parceiros:</p>
          <ul className="space-y-4 mb-10 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">✅</span>
              <span>Cadastre beneficiários sem celular</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">✅</span>
              <span>Acompanhe processos em tempo real</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">✅</span>
              <span>Contribua com bases de conhecimento</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">✅</span>
              <span>Amplifique seu impacto social</span>
            </li>
          </ul>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100 font-bold text-lg h-auto py-4">
            Quero Ser Parceiro 🤝
          </Button>
        </div>

        {/* Donation Section */}
        <div className="bg-pink-500 text-white p-12 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Quer Apoiar a Causa?</h2>
          <p className="text-xl mb-8 text-white/90 leading-relaxed text-pretty">
            Sua doação permite que mais pessoas acessem seus direitos dignamente.
          </p>
          <ul className="space-y-4 mb-10 text-lg">
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">💛</span>
              <span>100% transparente</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">📊</span>
              <span>Relatórios mensais</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">🔒</span>
              <span>Pagamento seguro</span>
            </li>
          </ul>
          <Button size="lg" className="bg-white text-pink-600 hover:bg-slate-100 font-bold text-lg h-auto py-4">
            Fazer Doação 💜
          </Button>
        </div>
      </div>
    </section>
  )
}
