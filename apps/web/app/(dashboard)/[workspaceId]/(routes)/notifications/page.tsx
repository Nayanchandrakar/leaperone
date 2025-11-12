"use client"

import { Panel, PanelContent, PanelItem, PanelTrigger } from "@app/ui/components/panel"

const items = [
  {
    title: "Is it accessible?",
    content:
      "Bruce was a merchant in Rotterdam during the 1650s, and played a role in the Restoration of Charles II in 1659. He carried messages between the exiled king and General Monck, and his loyalty to the king was rewarded with lucrative official appointments, including that of Surveyor General of the King's Works in Scotland, effectively making Bruce the",
  },
  {
    title: "Is it styled?",
    content:
      "Bruce was a merchant in Rotterdam during the 1650s, and played a role in the Restoration of Charles II in 1659. He carried messages between the exiled king and General Monck, and his loyalty to the king was rewarded with lucrative official appointments, including that of Surveyor General of the King's Works in Scotland, effectively making Bruce the",
  },
  {
    title: "Is it animated?",
    content:
      "Bruce was a merchant in Rotterdam during the 1650s, and played a role in the Restoration of Charles II in 1659. He carried messages between the exiled king and General Monck, and his loyalty to the king was rewarded with lucrative official appointments, including that of Surveyor General of the King's Works in Scotland, effectively making Bruce the",
  },
]

export default function NotificationsPage() {
  return (
    <section className="mt-8 container space-y-4">
      <Panel type="multiple">
        {items.map(({ title, content }, index) => {
          const key = `item-${index}`
          return (
            <PanelItem key={key} value={key}>
              <PanelTrigger>{title}</PanelTrigger>
              <PanelContent>{content}</PanelContent>
            </PanelItem>
          )
        })}
      </Panel>
    </section>
  )
}
