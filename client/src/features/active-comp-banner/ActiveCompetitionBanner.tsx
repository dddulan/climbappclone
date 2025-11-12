import type { Competition } from "@/models/competition";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Trophy } from "lucide-react";

interface ActiveCompetitionBannerProps {
  competition: Competition;
}

const hasSelection = (competition: Competition) => Boolean(competition?.id && competition.id !== 0);

export const ActiveCompetitionBanner = ({
  competition,
}: ActiveCompetitionBannerProps) => {
  const selected = hasSelection(competition);

  const badgeLabel = selected ? "Selected" : "Please Select a Competition";
  const competitionLabel = selected
    ? competition?.id || "Untitled competition"
    : "No competition selected";

  return (
    <Card className="border-none bg-transparent shadow-none !gap-0 !p-0 !m-0">
      <CardContent className="flex items-center justify-between gap-2 px-3 py-1 text-[11px] sm:px-6 sm:text-xs lg:px-8">
        <div className="flex flex-wrap items-center gap-2">
          <Trophy className="h-4 w-4 text-muted-foreground" />
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            Active Competition
          </p>
          <Badge variant={selected ? "default" : "secondary"}>{badgeLabel}</Badge>
          <span className="text-sm text-foreground">{competitionLabel}</span>
        </div>
        {selected && (competition.date_of || "").length > 0 && (
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground sm:text-xs">
            <CalendarDays className="h-4 w-4" />
            <span>{competition.date_of}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveCompetitionBanner;
