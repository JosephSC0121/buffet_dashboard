import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function AppAccordion({ title, data, value }) {
    return (
            <AccordionItem value={value}>
                <AccordionTrigger>{title}</AccordionTrigger>
                <AccordionContent>
                    <ul className="list-disc pl-4">
                        {data.map((ingrediente, index) => (
                            <li key={index}>{ingrediente}</li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
    );
}
