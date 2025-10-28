import { SignUpForm } from "@/features/sign-up.tsx/sign-up-form/SignUpForm";

const SignUpHome: React.FC = () => {
  return (
    <div className="bg-muted min-h-svh p-6 md:p-10">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg p-6 mb-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">Join the Competition! 🎯</h1>
              <p className="text-green-100 text-sm">Register now and start climbing</p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-xl font-bold">45</p>
                <p className="text-xs text-green-100">Registered</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">8</p>
                <p className="text-xs text-green-100">Schools</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Up Form */}
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpHome;
