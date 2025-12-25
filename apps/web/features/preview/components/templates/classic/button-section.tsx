import { Button } from "@app/ui/components/button"

interface ButtonSectionProps {
  title: string
  description: string
  buttonText: string
}

export const ButtonSection = ({ title, description, buttonText }: ButtonSectionProps) => {
  return (
    <article className="space-y-6 bg-white p-8 pt-7 rounded-3xl">
      <header className="space-y-3 text-center">
        <h2 className="text-[28px] font-semibold text-primary">{title}</h2>
        <p className="text-base font-normal text-muted-foreground">{description}</p>
      </header>
      <Button size="lg" className="w-full">
        {buttonText}
      </Button>
    </article>
  )
}
