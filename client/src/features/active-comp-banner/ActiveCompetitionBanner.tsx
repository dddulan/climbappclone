import type { Competition } from "@/models/competition";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Trophy, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useCompetition } from "@/hooks/useCompetition";
import { getAllCompetitions } from "@/services/competitionService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ActiveCompetitionBannerProps {
  competition: Competition;
}

const hasSelection = (competition: Competition) =>
  Boolean(competition?.id && competition.id !== 0);

export const ActiveCompetitionBanner = ({
  competition,
}: ActiveCompetitionBannerProps) => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  const { comp, setComp } = useCompetition();

  // Refetch competitions when the banner mounts or when comp changes
  useEffect(() => {
    const fetchCompetitions = () => {
      getAllCompetitions()
        .then((res: Competition[]) => {
          setCompetitions(res);
        })
        .catch(console.error);
    };

    fetchCompetitions();

    // Set up interval to periodically refresh competitions list
    const interval = setInterval(fetchCompetitions, 5000);

    return () => clearInterval(interval);
  }, []);

  const selected = hasSelection(competition);

  const handleCompChange = (comp: Competition) => {
    setComp(comp);
  };

  const badgeLabel = selected ? "Selected" : "Please Select a Competition";
  const competitionLabel = selected
    ? comp.id || "Untitled competition"
    : "No competition selected";

  return (
    <Card className="border bg-neutral-50 shadow-none !gap-0 !p-0 !m-0 ">
      <CardContent className="flex items-center p-1 ">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex flex-col">
            <div className="flex flex-row">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <p className="text-[14px] font-semibold uppercase tracking-wide text-muted-foreground">
                Active Competition
              </p>
            </div>
            <div>
              {selected && (competition.date_of || "").length > 0 && (
                <div className="flex items-center gap-2 text-[16px] text-muted-foreground sm:text-sm">
                  <CalendarDays className="h-4 w-4" />
                  <span>{competition.date_of}</span>
                </div>
              )}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity sm:text-md">
                <Badge variant={selected ? "default" : "secondary"}>
                  {badgeLabel}:<p className="text-md"> {competitionLabel} </p>
                  <ChevronDown />
                </Badge>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {competitions.map((comp) => (
                <DropdownMenuItem
                  key={comp.id}
                  onClick={() => handleCompChange(comp)}
                >
                  {comp.id}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveCompetitionBanner;
