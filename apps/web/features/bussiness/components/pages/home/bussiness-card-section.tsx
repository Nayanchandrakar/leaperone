"use client"

import { memo } from "react"

import { EditorStepper } from "@/features/bussiness/components/editor/editor-step-navigator"
import { RenderStepContent } from "@/features/bussiness/components/editor/render-step-content"
import { CardPreviewSection } from "@/features/bussiness/components/pages/home/bussiness-card-preview-section"
import { EditorFooter } from "@/features/bussiness/components/ui/editor-footer"
import { EditorWrapper } from "@/features/bussiness/components/ui/editor-wrapper"

export const BussinessCardSection = memo(() => {
  return (
    <section className="container my-20 grid grid-cols-1 md:grid-cols-[1.6fr_minmax(330px,0.4fr)] gap-6 md:gap-8">
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
