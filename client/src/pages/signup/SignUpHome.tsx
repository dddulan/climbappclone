import { SignUpForm } from "@/features/sign-up.tsx/sign-up-form/SignUpForm";

const SignUpHome: React.FC = () => {
  return (
    <div className="bg-muted min-h-svh p-6 md:p-10">
      <div className="container mx-auto max-w-6xl">


        {/* Sign Up Form */}
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpHome;
