"use client"

import { memo } from "react"

import { EditorStepper } from "@/features/bussiness/components/editor/editor-step-navigator"
import { RenderStepContent } from "@/features/bussiness/components/editor/render-step-content"
import { CardPreviewSection } from "@/features/bussiness/components/pages/home/bussiness-card-preview-section"
import { EditorFooter } from "@/features/bussiness/components/ui/editor-footer"
import { EditorWrapper } from "@/features/bussiness/components/ui/editor-wrapper"

export const BussinessCardSection = memo(() => {
  return (
    <section className="container my-20 grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,380px)] gap-6 md:gap-7">
      <div className="space-y-5">
        <EditorStepper />
        <EditorWrapper>
          <RenderStepContent />
        </EditorWrapper>
        <EditorFooter />
      </div>
      <CardPreviewSection />
    </section>
  )
})
