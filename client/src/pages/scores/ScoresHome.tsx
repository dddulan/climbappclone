import { LogScore } from "@/features/log-score/LogScore";
const ScoresHome: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto max-w-3xl">
        <div>
          <LogScore />
        </div>
      </div>
    </div>
  );
};

export default ScoresHome;
