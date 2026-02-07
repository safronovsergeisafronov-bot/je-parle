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
    <section id="faq" className="py-12 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <TextGenerateEffect
              as="h2"
              text="Ответы на вопросы"
              className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground"
            />
            <ContactModal>
              <Button variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Задать вопрос
              </Button>
            </ContactModal>
          </div>

          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={`item-${item.id}`}
                className="bg-background rounded-xl px-4 border border-border"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium text-foreground pr-4">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
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
