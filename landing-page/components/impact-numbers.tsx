"use client"

import type React from "react"

import { Users, BookOpen, Heart, TrendingUp } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface StatCardProps {
  icon: React.ReactNode
  number: string
  label: string
  description: string
  color: string
}

function StatCard({ icon, number, label, description, color }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`bg-white shadow-lg hover:shadow-2xl rounded-2xl p-8 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className={`${color} mb-4`}>{icon}</div>
      <div className="text-5xl font-bold mb-2 text-slate-900">{number}</div>
      <div className="text-xl font-semibold mb-3 text-slate-700">{label}</div>
      <p className="text-slate-600 leading-relaxed text-pretty">{description}</p>
    </div>
  )
}

export function ImpactNumbers() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <StatCard
            icon={<Users className="w-12 h-12" />}
            number="847+"
            label="Pessoas Assistidas"
            description="Cada atendimento personalizado com respeito ao nome social"
            color="text-purple-600"
          />
          <StatCard
            icon={<BookOpen className="w-12 h-12" />}
            number="23"
            label="Guias Completos"
            description="Sobre direitos, documentos, benefícios e saúde trans"
            color="text-pink-500"
          />
          <StatCard
            icon={<Heart className="w-12 h-12" />}
            number="12"
            label="ONGs Parceiras"
            description="Rede de apoio presencial em todo Brasil"
            color="text-emerald-500"
          />
          <StatCard
            icon={<TrendingUp className="w-12 h-12" />}
            number="R$ 45.320"
            label="Investidos na Causa"
            description="100% aplicados em tecnologia e apoio comunitário"
            color="text-purple-600"
          />
        </div>
      </div>
    </section>
  )
}
