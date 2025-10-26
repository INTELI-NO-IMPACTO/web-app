import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900">Perguntas Frequentes 🤔</h2>

        {/* Accordion */}
        <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
          <AccordionItem value="item-1" className="bg-slate-50 rounded-lg px-6 border-none">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:no-underline">
              É realmente grátis para usar?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed text-pretty">
              Sim! 100% gratuito para pessoas trans e assistentes sociais. Nosso objetivo é facilitar o acesso, não
              lucrar com informação básica.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-slate-50 rounded-lg px-6 border-none">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:no-underline">
              Meus dados estão seguros?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed text-pretty">
              Absolutamente. Usamos criptografia de ponta a ponta, conformidade com LGPD e você pode usar o chat
              anonimamente.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-slate-50 rounded-lg px-6 border-none">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:no-underline">
              Posso usar sem me cadastrar?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed text-pretty">
              Sim! O chat é completamente anônimo. O cadastro é opcional e serve apenas para acompanhar processos
              específicos.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-slate-50 rounded-lg px-6 border-none">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:no-underline">
              Como funciona o acompanhamento por assistente?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed text-pretty">
              Assistentes de ONGs podem cadastrar beneficiários e acompanhar seu progresso na plataforma.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-slate-50 rounded-lg px-6 border-none">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:no-underline">
              Posso confiar nas informações da IA?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed text-pretty">
              A Luna é treinada em bases de conhecimento verificadas por especialistas e atualizada constantemente.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-slate-50 rounded-lg px-6 border-none">
            <AccordionTrigger className="text-lg font-semibold text-slate-900 hover:no-underline">
              Vocês atendem todo o Brasil?
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed text-pretty">
              Sim! A plataforma é nacional e nossa rede de ONGs parceiras cobre todas as regiões.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}
