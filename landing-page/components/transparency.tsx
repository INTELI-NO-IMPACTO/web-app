"use client"

import { useEffect, useRef, useState } from "react"

interface BarProps {
  percentage: number
  label: string
  description: string
  color: string
}

function ProgressBar({ percentage, label, description, color }: BarProps) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percentage), 100)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [percentage])

  return (
    <div ref={ref} className="mb-8">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-xl font-bold text-slate-900">
          {percentage}% - {label}
        </h3>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-4 mb-3 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="text-slate-600 leading-relaxed text-pretty">{description}</p>
    </div>
  )
}

export function Transparency() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900">Para Onde Vai Seu Apoio?</h2>

        {/* Progress Bars */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <ProgressBar
            percentage={70}
            label="Tecnologia e IA"
            description="Manutenção de servidores, API do GPT, desenvolvimento"
            color="bg-purple-600"
          />
          <ProgressBar
            percentage={40}
            label="ONGs Parceiras"
            description="Apoio financeiro direto às organizações da rede"
            color="bg-pink-500"
          />
          <ProgressBar
            percentage={25}
            label="Educação e Eventos"
            description="Workshops, capacitações e eventos comunitários"
            color="bg-emerald-500"
          />
          <ProgressBar
            percentage={15}
            label="Operacional"
            description="Custos administrativos e legais"
            color="bg-slate-600"
          />

          {/* Note */}
          <p className="text-sm text-slate-500 mt-8 text-center italic">
            Valores baseados no último trimestre. Relatório completo disponível para doadores.
          </p>
        </div>
      </div>
    </section>
  )
}
