import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@myleaper/ui/components/table"
import { Container } from "@/components/shared/container"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"
import { TEAMS_PER_MEMBER_COST } from "@/features/subscription/constants/pricing/teams-per-member-cost"

export const PerMemberPricing = () => {
  return (
    <Container className="pt-32 mx-auto relative">
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage:
            "radial-gradient(circle 300px at 50% 150px, rgba(188, 255, 163, 0.44), transparent)",
        }}
      />
      <h2 className="font-bold md:font-semibold text-3xl text-center  leading-tight ">
        <MarkerText
          alt="underline"
          style={{ top: "80%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          Team Plan Pricing By Team Size
        </MarkerText>
      </h2>

      <div className="mt-20 border border-border max-w-5xl mx-auto rounded-2xl overflow-hidden">
        <Table className="text-base selection:bg-primary selection:text-white bg-background">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left p-5 pl-7 font-semibold">
                Team Size
              </TableHead>
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
                <TableCell className="font-medium p-5 pl-7">
                  {teamSize}
                </TableCell>
                <TableCell className="text-left border-l border-border p-5">
                  {monthly}
                </TableCell>
                <TableCell className="text-left border-l border-border p-5">
                  {yearly}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  )
}
