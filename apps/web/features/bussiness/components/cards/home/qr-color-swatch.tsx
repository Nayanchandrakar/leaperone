interface QrColorSwatchProps extends React.ComponentProps<"div"> {
  color: string
}

export const QrColorSwatch = ({ color, ...props }: QrColorSwatchProps) => (
  <div
    style={{ backgroundColor: color }}
    className="aspect-square size-13 rounded-lg transition-colors duration-200 cursor-pointer outline outline-transparent hover:outline-primary outline-offset-2 data-[state=true]:outline-primary"
    {...props}
  />
)
