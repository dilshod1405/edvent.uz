import Image from "next/image";
import BlurredShape from "@/public/images/blurred-shape.svg";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute bottom-0 ml-20 -mb-24 -translate-x-1/2 pointer-events-none left-1/2 -z-10"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div className="px-4 mx-auto max-w6xl sm:px-6">
        <div className="py-12 bg-linear-to-r from-transparent via-gray-800/50 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-8 font-nacelle text-3xl font-semibold text-transparent md:text-4xl"
              data-aos="fade-up"
            >
              Bizning safimizga qo'shiling
            </h2>
            <div className="max-w-xs mx-auto sm:flex sm:max-w-none sm:justify-center">
              <div data-aos="fade-up" data-aos-delay={400}>
                <Link
                  className="btn group mb-4 w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%] sm:mb-0 sm:w-auto"
                  href="/signup"
                >
                  <span className="relative inline-flex items-center">
                    Ta'limni boshlash
                    <span className="ml-1 tracking-normal text-white/50 transition-transform group-hover:translate-x-0.5">
                      -&gt;
                    </span>
                  </span>
                </Link>
              </div>
              <div data-aos="fade-up" data-aos-delay={800}>
                <Link
                  className="btn relative w-full bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%] sm:ml-4 sm:w-auto"
                  href="/free-lessons"
                >
                  Bepul darslar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
