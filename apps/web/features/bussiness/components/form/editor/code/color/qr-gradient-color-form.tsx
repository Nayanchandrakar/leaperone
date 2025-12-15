// import { Field, FieldLabel, FieldLegend, FieldSet } from "@app/ui/components/field"
// import { RadioGroup, RadioGroupItem } from "@app/ui/components/radio-group"
// import { Slider } from "@app/ui/components/slider"
// import { useCallback } from "react"
// import { useShallow } from "zustand/react/shallow"
// import { ColorPicker } from "@/features/bussiness/components/ui/color-picker"
// import { QR_GRADIENT_TYPES } from "@/features/bussiness/constants/home/qr-code-colors"
// import { useQrCodeEditorStore } from "@/features/bussiness/stores/use-qr-code-editor-store"

export function QrGradientColorForm() {
  return <div className="" />
  // const { fillGradient, setFillGradient, setFillType, fillType } = useQrCodeEditorStore(
  //   useShallow((state) => ({
  //     fillGradient:
  //       state.settings.fill?.type === "gradient" ? state.settings.fill?.fillGradient : null,
  //     setFillGradient: state.setFillGradient,
  //     setFillType: state.setFillType,
  //   })),
  // )

  // const handleColorStop0Change = useCallback(
  //   (color: string) => {
  //     if (fill.fillGradient) {
  //       const newStops = [...fill.fillGradient.colorStops]
  //       newStops[0] = color
  //       updateGradientField("colorStops", newStops)
  //     }
  //   },
  //   [fill, updateGradientField],
  // )

  // const handleColorStop1Change = useCallback(
  //   (color: string) => {
  //     if (fill.fillGradient) {
  //       const newStops = [...fill.fillGradient.colorStops]
  //       newStops[1] = color
  //       updateGradientField("colorStops", newStops)
  //     }
  //   },
  //   [fill, updateGradientField],
  // )

  // const handleRotationChange = useCallback(
  //   ([value]: number[]) => {
  //     updateGradientField("rotation", value ?? 0)
  //   },
  //   [updateGradientField],
  // )

  // if (!fill.fillGradient) return null

  // return (
  //   <>
  //     <FieldSet>
  //       <FieldLegend>Gradient Style</FieldLegend>
  //       <RadioGroup
  //         name="gradient-type"
  //         value={fill.fillGradient.type}
  //         onValueChange={handleTypeChange}
  //       >
  //         {QR_GRADIENT_TYPES.map((option) => (
  //           <FieldLabel key={option.value} htmlFor={option.value} className="cursor-pointer">
  //             <Field orientation="horizontal">
  //               <span>{option.label}</span>
  //               <RadioGroupItem id={option.value} value={option.value} />
  //             </Field>
  //           </FieldLabel>
  //         ))}
  //       </RadioGroup>
  //     </FieldSet>

  //     <Field>
  //       <FieldLabel>Gradient Colors</FieldLabel>
  //       <div className="grid grid-cols-2 gap-3">
  //         <ColorPicker
  //           id="gradient-color-0"
  //           name="gradient-color-0"
  //           color={fill.fillGradient.colorStops[0]}
  //           onColorChange={handleColorStop0Change}
  //         />
  //         <ColorPicker
  //           id="gradient-color-1"
  //           name="gradient-color-1"
  //           color={fill.fillGradient.colorStops[1]}
  //           onColorChange={handleColorStop1Change}
  //         />
  //       </div>
  //     </Field>

  //     <Field>
  //       <FieldLabel htmlFor="gradient-rotation">Gradient Angle</FieldLabel>
  //       <Slider
  //         min={1}
  //         step={1}
  //         max={360}
  //         id="gradient-rotation"
  //         name="gradient-rotation"
  //         value={[fill.fillGradient.rotation]}
  //         onValueChange={handleRotationChange}
  //         className="**:data-[slot=slider-thumb]:shadow-none **:data-[slot=slider-thumb]:h-13! **:data-[slot=slider-thumb]:w-3 **:data-[slot=slider-track]:h-9 **:data-[slot=slider-track]:rounded-lg [&>:last-child>span]:h-9 [&>:last-child>span]:w-3 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-primary [&>:last-child>span]:ring-offset-0"
  //       />
  //     </Field>
  //   </>
  // )
}
