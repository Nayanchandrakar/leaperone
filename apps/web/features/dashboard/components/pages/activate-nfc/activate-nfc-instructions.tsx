import { NFC_INSTRUCTIONS } from "@/features/dashboard/constants/activate-nfc/instructions"

export function ActivateNfcInstructions() {
  return (
    <div className="px-4 sm:px-12 space-y-2">
      <p className="font-semibold text-lg text-center">
        Keep in mind before activating a new NFC item:
      </p>

      <ol className="list-disc list-outside space-y-1">
        {NFC_INSTRUCTIONS.map((instruction, index) => (
          <li key={index} className="text-muted-foreground font-normal text-sm">
            {instruction}
          </li>
        ))}
      </ol>
    </div>
  )
}
