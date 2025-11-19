"use client"

// import { useForm, useStore } from "@tanstack/react-form"
// import z from "zod"
import { Editor } from "@/features/bussiness/components/editor/home"
import { EditorPreviewPanel } from "@/features/bussiness/components/editor/home/editor-preview-panel"

// const formSchema = z.object({
//   templateId: z.string(),
//   container: z.array(
//     z.object({
//       type: z.literal("profile").default("profile"),
//       enabled: z.boolean(),
//       photo: z.object({
//         enabled: z.boolean(),
//         url: z.url(),
//       }),

//       logo: z.object({
//         enabled: z.boolean(),
//         url: z.url(),
//       }),

//       name: z.string().min(3).max(20),
//       info: z.object({
//         infoOne: z.object({
//           enabled: z.boolean(),
//           value: z.string().min(3).max(40),
//         }),
//         infoTwo: z.object({
//           enabled: z.boolean(),
//           value: z.string().min(3).max(40),
//         }),
//       }),

//       contact: z.object({
//         enabled: z.boolean(),
//         links: z.array(
//           z.discriminatedUnion("type", [
//             z.object({
//               type: z.literal("phone"),
//               value: z.e164().trim(),
//             }),

//             z.object({
//               type: z.literal("email"),
//               value: z.email().trim(),
//             }),
//             z.object({
//               type: z.literal("website"),
//               value: z.url(),
//             }),
//             z.object({
//               type: z.literal("location"),
//               value: z.url(),
//             }),
//             z.object({
//               type: z.literal("sms"),
//               value: z.e164().trim(),
//             }),

//             z.object({
//               type: z.literal("whatsapp"),
//               value: z.e164().trim(),
//             }),

//             z.object({
//               type: z.literal("webchat"),
//               value: z.url(),
//             }),

//             z.object({
//               type: z.literal("telegram"),
//               value: z.url(),
//             }),
//           ]),
//         ),
//       }),
//     }),
//   ),
// })

export const BusinessEditorLayout = () => {
  // const form = useForm({
  //   defaultValues: {
  //     templateId: "sdfsdfsdfsdf",
  //     container: [
  //       {
  //         enabled: true,
  //         photo: { enabled: true, url: "https://picsum.photos/200" },
  //         logo: { enabled: true, url: "https://picsum.photos/200" },
  //         name: "Micheal Jordan",
  //         info: {
  //           infoOne: { enabled: true, value: "Sales Representative" },
  //           infoTwo: { enabled: true, value: "Electrica  Automobiles " },
  //         },
  //         contact: {
  //           enabled: true,
  //           links: [
  //             { type: "phone", value: "+1234567890" },
  //             { type: "email", value: "john.doe@example.com" },
  //             { type: "website", value: "https://www.example.com" },
  //             {
  //               type: "location",
  //               value: "https://www.google.com/maps/place/123+Main+St,+Anytown,+USA",
  //             },
  //             { type: "sms", value: "+1234567890" },
  //             { type: "whatsapp", value: "+1234567890" },
  //             { type: "webchat", value: "https://www.example.com" },
  //           ],
  //         },
  //       },
  //     ],
  //   },
  //   validators: {
  //     onSubmit: formSchema,
  //     onChange: formSchema,
  //   },
  // })

  return (
    <div className="container my-20 grid grid-cols-1 md:grid-cols-[1.6fr_minmax(330px,0.4fr)] gap-6 md:gap-8">
      <Editor />
      <EditorPreviewPanel />
    </div>
  )
}

{
  /* <form
          ref={formRef}
          id="myform"
          className="my-12 bg-zinc-50 border-gray-300 border rounded-4xl p-8"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          {selectedStep === 0 && (
            <Panel className="space-y-4">
              <form.Field
                mode="array"
                name="container"
                children={(field) => {
                  return field.state.value.map((item, i) => {
                    return (
                      <PanelItem key={i} open={isOpen}>
                        <PanelTrigger>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <PanelIconButton>
                              <GripVertical />
                            </PanelIconButton>
                            <span className="text-base font-medium">Card Profile</span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <Switch checked={isOpen} onCheckedChange={() => onTrigger(value)} />
                            <span className="cursor-pointer size-8 bg-white border  border-gray-300 rounded-full flex items-center justify-center">
                              <ChevronDown
                                data-state={isOpen}
                                className="size-5 cursor-pointer transition-transform data-[state=true]:rotate-180 text-muted-foreground"
                                onClick={() => onTrigger(value)}
                              />
                            </span>
                          </div>
                        </PanelTrigger>
                        <PanelContent className="space-y-4">
                          <form.Field
                            name={`container[${i}].name`}
                            children={(subField) => {
                              const isInvalid =
                                subField.state.meta.isTouched && !subField.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex items-center gap-2">
                                    <FieldLabel>Name</FieldLabel>
                                    <form.Field
                                      name={`container[${i}].enabled`}
                                      children={(toggleField) => {
                                        const Icon = toggleField.state.value ? Eye : EyeOff
                                        return (
                                          <Icon
                                            className="size-4"
                                            onClick={() =>
                                              toggleField.handleChange(!toggleField.state.value)
                                            }
                                          />
                                        )
                                      }}
                                    />
                                  </div>

                                  <Input
                                    type="text"
                                    variant="gray"
                                    id={subField.name}
                                    name={subField.name}
                                    aria-invalid={isInvalid}
                                    value={subField.state.value}
                                    onBlur={subField.handleBlur}
                                    onChange={(e) => subField.handleChange(e.target.value)}
                                  />
                                  {isInvalid && <FieldError errors={subField.state.meta.errors} />}
                                </Field>
                              )
                            }}
                          />

                          <div className="flex items-center gap-4">
                            <form.Field
                              name={`container[${i}].info.infoOne.value`}
                              children={(subField) => {
                                const isInvalid =
                                  subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field data-invalid={isInvalid}>
                                    <div className="flex items-center gap-2">
                                      <FieldLabel>Info Line 1</FieldLabel>
                                      <form.Field
                                        name={`container[${i}].info.infoOne.enabled`}
                                        children={(toggleField) => {
                                          const Icon = toggleField.state.value ? Eye : EyeOff
                                          return (
                                            <Icon
                                              className="size-4"
                                              onClick={() =>
                                                toggleField.handleChange(!toggleField.state.value)
                                              }
                                            />
                                          )
                                        }}
                                      />
                                    </div>
                                    <Input
                                      type="text"
                                      variant="gray"
                                      id={subField.name}
                                      name={subField.name}
                                      aria-invalid={isInvalid}
                                      value={subField.state.value}
                                      onBlur={subField.handleBlur}
                                      onChange={(e) => subField.handleChange(e.target.value)}
                                    />
                                    {isInvalid && (
                                      <FieldError errors={subField.state.meta.errors} />
                                    )}
                                  </Field>
                                )
                              }}
                            />

                            <form.Field
                              name={`container[${i}].info.infoTwo.value`}
                              children={(subField) => {
                                const isInvalid =
                                  subField.state.meta.isTouched && !subField.state.meta.isValid
                                return (
                                  <Field data-invalid={isInvalid}>
                                    <div className="flex items-center gap-2">
                                      <FieldLabel>Info Line 2</FieldLabel>
                                      <form.Field
                                        name={`container[${i}].info.infoTwo.enabled`}
                                        children={(toggleField) => {
                                          const Icon = toggleField.state.value ? Eye : EyeOff
                                          return (
                                            <Icon
                                              className="size-4"
                                              onClick={() =>
                                                toggleField.handleChange(!toggleField.state.value)
                                              }
                                            />
                                          )
                                        }}
                                      />
                                    </div>
                                    <Input
                                      type="text"
                                      variant="gray"
                                      id={subField.name}
                                      name={subField.name}
                                      aria-invalid={isInvalid}
                                      value={subField.state.value}
                                      onBlur={subField.handleBlur}
                                      onChange={(e) => subField.handleChange(e.target.value)}
                                    />
                                    {isInvalid && (
                                      <FieldError errors={subField.state.meta.errors} />
                                    )}
                                  </Field>
                                )
                              }}
                            />
                          </div>
                        </PanelContent>
                      </PanelItem>
                    )
                  })
                }}
              />
            </Panel>
          )}
          {selectedStep === 1 && <div className="">Design settings</div>}
          {selectedStep === 2 && <div className="">Qr code settings</div>}
        </form> */
}
