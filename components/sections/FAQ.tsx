import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { ContactModal } from "@/components/ContactModal"
import { Search } from "lucide-react"
import { faqItems } from "@/lib/data"
import { TextGenerateEffect } from "@/components/TextGenerateEffect"

export function FAQ() {
  return (
    <section id="faq" className="py-10 md:py-15 bg-secondary/20">
      <div className="w-full px-3 lg:px-4">
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <TextGenerateEffect
              as="h2"
              text="Ответы на вопросы"
              className="text-3xl md:text-4xl font-medium leading-[1.15] tracking-[-0.03em] text-foreground"
            />
            <ContactModal>
              <Button className="bg-[#F2ECDE] text-foreground hover:bg-[#e5dece] hover:scale-100 border-0 shadow-none">
                <Search className="w-4 h-4 mr-2 text-foreground" />
                Задать вопрос
              </Button>
            </ContactModal>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="bg-white rounded-2xl px-4 border border-border hover:border-accent/15 transition-colors duration-250"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium text-foreground pr-4">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
