import { SignUpForm } from "@/features/sign-up.tsx/sign-up-form/SignUpForm";

const SignUpHome: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto max-w-6xl">


        {/* Sign Up Form */}
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpHome;
