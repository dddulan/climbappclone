import { LogScore } from "@/features/log-score/LogScore";

const ScoresHome: React.FC = () => {
  return (
    <div className="bg-muted min-h-svh p-6 md:p-10">
      <div className="container mx-auto max-w-3xl">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-orange-600 to-purple-500 rounded-lg p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Ready to Score? </h1>
              <p className="text-cyan-100 text-sm">
                Log your routes and track your progress
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">

              <div className="text-center">
                <p className="text-xl font-bold">45</p>
                <p className="text-xs text-cyan-100">Climbers</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <LogScore />
        </div>
      </div>
    </div>
  );
};

export default ScoresHome;
