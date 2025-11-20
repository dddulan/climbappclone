import { LogScore } from "@/features/log-score/LogScore";
const ScoresHome: React.FC = () => {
  return (
    <div className="bg-muted min-h-svh p-6 md:p-10">
      <div className="container mx-auto max-w-3xl">
        <div>
          <LogScore />
        </div>
      </div>
    </div>
  );
};

export default ScoresHome;
