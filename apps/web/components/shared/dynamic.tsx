import dynamic from "next/dynamic"
import { EditorLoadingSkeleton } from "@/features/bussiness/components/skeleton/home/form-loading"
import { QrPreviewLoadingSkeleton } from "@/features/bussiness/components/skeleton/home/qr-preview-loading"

export const LazyContentEditor = dynamic(
  () => import("@/features/bussiness/components/editor/home/content-editor"),
  {
    ssr: false,
    loading: () => <EditorLoadingSkeleton />,
  },
)

export const LazyDesignEditor = dynamic(
  () => import("@/features/bussiness/components/editor/home/design-editor"),
  {
    ssr: false,
    loading: () => <EditorLoadingSkeleton />,
  },
)

export const LazyQrCodeEditor = dynamic(
  () => import("@/features/bussiness/components/editor/home/qr-code-editor"),
  {
    ssr: false,
    loading: () => <EditorLoadingSkeleton />,
  },
)

export const LazyQrCodeCardPreview = dynamic(
  () => import("@/features/bussiness/components/preview/home/qr-code-card-preview"),
  {
    ssr: false,
    loading: () => <QrPreviewLoadingSkeleton />,
  },
)
