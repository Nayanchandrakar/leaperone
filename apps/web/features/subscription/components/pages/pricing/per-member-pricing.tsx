import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@app/ui/components/table"
import { UnderlineText } from "@/features/marketing/components/ui/underline-text"
import { TEAMS_PER_MEMBER_COST } from "@/features/subscription/constants/pricing/teams-per-member-cost"

export function PerMemberPricing() {
  return (
    <section className="container mt-32" id="plan-pricing">
      <h2 className="font-bold md:font-semibold text-3xl text-center  leading-tight ">
        <UnderlineText>Team Plan Pricing By Team Size</UnderlineText>
      </h2>

      <div className="mt-20 border border-border max-w-5xl mx-auto rounded-2xl overflow-hidden">
        <Table className="text-base selection:bg-primary selection:text-white bg-background">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left p-5 pl-7 font-semibold">Team Size</TableHead>
              <TableHead className="text-left border-l border-border p-5 font-semibold">
                Monthly, per user
              </TableHead>
              <TableHead className="text-left border-l border-border p-5 font-semibold">
                Yearly, per user
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEAMS_PER_MEMBER_COST.map(({ monthly, teamSize, yearly }) => (
              <TableRow key={teamSize}>
                <TableCell className="font-medium p-5 pl-7">{teamSize}</TableCell>
                <TableCell className="text-left border-l border-border p-5">{monthly}</TableCell>
                <TableCell className="text-left border-l border-border p-5">{yearly}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
