import type { Competition } from "@/models/competition";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Trophy } from "lucide-react";

interface ActiveCompetitionBannerProps {
  competition: Competition;
}

const hasSelection = (competition: Competition) => Boolean(competition?.id);

export const ActiveCompetitionBanner = ({
  competition,
}: ActiveCompetitionBannerProps) => {
  const selected = hasSelection(competition);

  const badgeLabel = selected ? "Selected" : "None";
  const competitionLabel = selected
    ? competition.type || "Untitled competition"
    : "No competition selected";

  return (
    <Card className="border-none bg-transparent shadow-none !gap-0 px-3 !py-0 sm:px-6 lg:px-8">
      <CardContent className="flex items-center justify-between gap-2 !px-0 !py-1 text-[11px] sm:!py-1 sm:text-xs">
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
