interface CardColorProps extends React.ComponentProps<"div"> {
  backgroundColor: string
  highlightColor: string
}

export const CardColorSwatch = ({ backgroundColor, highlightColor, ...props }: CardColorProps) => (
  <div
    style={
      {
        backgroundColor,
        "--highlight-color": highlightColor,
      } as React.CSSProperties
    }
    className="aspect-square size-16 relative after:content-[''] after:absolute after:w-full after:bg-(--highlight-color)  after:rounded-b-lg after:h-6 after:bottom-0 rounded-lg object-cover transition-colors duration-200 cursor-pointer outline outline-transparent hover:outline-primary outline-offset-2 data-[state=true]:outline-primary"
    {...props}
  />
)
