import Header from "@/components/ui/header";
import SignUpForm from "./SignUpForm";
import Link from "next/link";

export const metadata = {
  title: "Edvent.uz | Ro'yxatdan o'tish",
};

export default function SignUpPage() {
  return (
    <section>
      <Header />
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Ro'yxatdan o'tish
            </h1>
          </div>

          {/* SignUpForm component */}
          <SignUpForm />
          
          {/* Bottom link */}
          <div className="mt-6 text-sm text-center text-indigo-200/65">
            Akkauntingiz bormi?{" "}
            <Link className="font-medium text-indigo-500" href="/signin">
              Shaxsiy kabinet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
