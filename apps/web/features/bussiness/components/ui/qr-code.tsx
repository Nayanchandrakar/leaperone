// import type { FileExtension, Options } from "qr-code-styling"
// import QRCodeStyling from "qr-code-styling"
// import type React from "react"
// import { createContext, type SetStateAction, useContext, useEffect, useRef, useState } from "react"

// const QR_CODE_OPTIONS: Options = {
//   width: 300,
//   height: 300,
//   type: "svg",
//   data: "http://qr-code-styling.com",
//   image: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png",
//   margin: 35,
//   cornersDotOptions: {
//     type: "extra-rounded",
//   },
//   qrOptions: {
//     typeNumber: 0,
//     mode: "Byte",
//     errorCorrectionLevel: "Q",
//   },
//   imageOptions: {
//     imageSize: 0.4,
//     // margin: 5,
//     crossOrigin: "anonymous",
//     saveAsBlob: true,
//   },
//   dotsOptions: {
//     color: "black",
//     type: "classy-rounded",
//     // roundSize: true,
//     // roundSize: true,
//   },
//   backgroundOptions: {
//     color: "white",
//     gradient: {
//       type: "radial",
//       colorStops: [
//         {
//           color: "red",
//           offset: 0,
//         },
//         {
//           color: "blue",
//           offset: 1,
//         },
//       ],
//       rotation: 0,
//     },
//   },
//   shape: "square",
//   cornersSquareOptions: {
//     type: "square",
//     color: "green",
//   },
// }

// type QrCodeContextProps = {
//   options: Options
//   qrCode: QRCodeStyling
//   fileExt: FileExtension

//   setOptions: React.Dispatch<SetStateAction<Options>>
//   qrCodeRef: React.RefObject<HTMLDivElement | null>
//   setQrCode: React.Dispatch<SetStateAction<QRCodeStyling>>
//   setFileExt: React.Dispatch<SetStateAction<FileExtension>>
// }

// const QrCodeContext = createContext<any | null>(null)
// export const useQrCodeContext = () => {
//   const context = useContext(QrCodeContext)
//   if (!context) {
//     throw new Error("useQrCodeContext must be used within QrCodeContext")
//   }
//   return context
// }

// export const QrCodeProvider = ({
//   children,
//   settings,
// }: {
//   children: React.ReactNode
//   settings: any
// }) => {
//   const qrCodeRef = useRef<HTMLDivElement | null>(null)
//   const [options, setOptions] = useState<Options>(QR_CODE_OPTIONS)
//   const [qrCode, setQrCode] = useState<QRCodeStyling | undefined>(undefined)

//   useEffect(() => {
//     setQrCode(new QRCodeStyling(options))
//   }, [options])

//   useEffect(() => {
//     if (qrCodeRef?.current) {
//       qrCode?.append(qrCodeRef.current)
//     }
//   }, [qrCode])

//   useEffect(() => {
//     if (!qrCode) return
//     qrCode?.update(options)
//   }, [qrCode, options])

//   return (
//     <QrCodeContext.Provider value={{ options, setOptions, qrCodeRef }}>
//       {children}
//     </QrCodeContext.Provider>
//   )
// }

// export const QrCodePreview = () => {
//   const { qrCodeRef } = useQrCodeContext()
//   return <div ref={qrCodeRef} />
// }
