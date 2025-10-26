import type React from "react"
import { MessageCircle, BookMarked, Users } from "lucide-react"

interface StepProps {
  icon: React.ReactNode
  number: string
  title: string
  description: string
  badges: string[]
  iconBg: string
  iconColor: string
  showLine?: boolean
}

function Step({ icon, number, title, description, badges, iconBg, iconColor, showLine = true }: StepProps) {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Icon */}
        <div className={`${iconBg} ${iconColor} rounded-full p-6 flex-shrink-0`}>{icon}</div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
            {number}. {title}
          </h3>
          <p className="text-lg text-slate-600 mb-4 leading-relaxed text-pretty">{description}</p>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <span key={index} className="bg-slate-100 text-slate-700 px-4 py-1.5 rounded-full text-sm font-medium">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Connecting Line */}
      {showLine && (
        <div className="hidden md:block absolute left-12 top-24 w-0.5 h-24 bg-gradient-to-b from-slate-300 to-transparent" />
      )}
    </div>
  )
}

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Como Funciona? ✨</h2>
          <p className="text-xl text-slate-600 text-balance">Três passos simples para acessar seus direitos</p>
        </div>

        {/* Steps */}
        <div className="space-y-16">
          <Step
            icon={<MessageCircle className="w-8 h-8" />}
            number="1"
            title="Converse com a LUA"
            description="Nossa assistente de IA está disponível 24/7 via WhatsApp, site ou chat anônimo. Você escolhe como se sentir mais confortável."
            badges={["Anônimo", "24/7"]}
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
          />

          <Step
            icon={<BookMarked className="w-8 h-8" />}
            number="2"
            title="Encontre Informações Claras"
            description="Guias completos sobre retificação de nome, benefícios sociais, acesso ao SUS e mercado de trabalho. Em linguagem acessível."
            badges={["Sem juridiquês", "Atualizado"]}
            iconBg="bg-pink-100"
            iconColor="text-pink-600"
          />

          <Step
            icon={<Users className="w-8 h-8" />}
            number="3"
            title="Receba Apoio Humanizado"
            description="Conecte-se com assistentes de ONGs parceiras se precisar de acompanhamento presencial. Você nunca está sozinha(o)."
            badges={["Rede de apoio", "Presencial"]}
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
            showLine={false}
          />
        </div>
      </div>
    </section>
  )
}
