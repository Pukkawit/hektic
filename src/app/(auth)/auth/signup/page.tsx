import SignUpForm from "./components/SignUpForm";

// Exporting metadata for SEO
export const metadata = {
  title: "Sign Up - Hektic",
  description: "Create a new account to use Hektic dashboard and features.",
  robots: "index, follow",
};

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <SignUpForm />
    </div>
  );
}
