export const metadata = {
    title: "Reset Password - Open PRO",
    description: "Page description",
  };
  
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

  export default function ResetPassword() {
    return (
      <section>
        <Header />
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section header */}
            <div className="pb-12 text-center">
              <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                Parolni tiklash
              </h1>
            </div>
            {/* Contact form */}
            <form className="mx-auto max-w-[400px]">
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full form-input"
                  placeholder="Email manzilingizni kiriting"
                  required
                />
              </div>
              <div className="mt-6">
                <button className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]">
                  RYuborish
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </section>
    );
  }
  