import Logo from "./logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";

export default function Footer() {
  return (
    <footer>
      <div className="relative max-w-6xl px-4 mx-auto sm:px-6">
        {/* Footer illustration */}
        <div
          className="absolute bottom-0 -translate-x-1/2 pointer-events-none left-1/2 -z-10"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>
        <div className="grid grid-cols-2 justify-between gap-12 py-8 sm:grid-rows-[auto_auto] md:grid-cols-4 md:grid-rows-[auto_auto] md:py-12 lg:grid-cols-[repeat(4,minmax(0,140px))_1fr] lg:grid-rows-1 xl:gap-20">
          {/* 1st block */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Kurslar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Arxitektura
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Qurilish muhandisligi
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Dasturlash
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Dizayn
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Iqtisod
                </a>
              </li>
            </ul>
          </div>
          {/* 2nd block */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Xizmatlar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Arxitektura loyihalari
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Qurilish loyihalari
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Dasturlash xizmatlari
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Dizayn xizmatlari
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Buxgalteriya xizmatlari
                </a>
              </li>
            </ul>
          </div>
          {/* 3rd block */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Resurslar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Qurilish hujjatlari
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Dasturiy ta'minot
                </a>
              </li>
            </ul>
          </div>
          {/* 4th block */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">
              Biz haqimizda
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Mentorlar
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Rasmiy hujjatlar
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Barcha kurslar
                </a>
              </li>
              <li>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Imtihonlar
                </a>
              </li>
            </ul>
          </div>
          {/* 5th block */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:text-right">
            <div className="mb-3">
              <Logo />
            </div>
            <div className="text-sm">
              <p className="mb-3 text-indigo-200/65">
                © Edvent.uz
                <span className="text-gray-700"> - </span>
                <a
                  className="transition text-indigo-200/65 hover:text-indigo-500"
                  href="#0"
                >
                  Natija
                </a>
              </p>
              <ul className="inline-flex gap-1">
                <li>
                  <a
                    className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                    href="https://www.youtube.com/@Edvent_uz"
                    aria-label="Youtube"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 700 700"
                        className="w-8 h-8 text-indigo-500 fill-current"
                        >
                        <path d="M549.7 124.1c-6.3-23.7-24.9-42.3-48.6-48.6C456.6 64 288 64 288 64s-168.6 0-213.1 11.5c-23.7 6.3-42.3 24.9-48.6 48.6C16.7 168.6 16 256 16 256s.7 87.4 10.3 131.9c6.3 23.7 24.9 42.3 48.6 48.6C119.4 448 288 448 288 448s168.6 0 213.1-11.5c23.7-6.3 42.3-24.9 48.6-48.6C559.3 343.4 560 256 560 256s-.7-87.4-10.3-131.9zM232 334V178l142 78-142 78z"/>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                    href="https://t.me/edvent_uz"
                    aria-label="Telegram"
                  >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 700 700"
                        className="w-8 h-8 text-indigo-500 fill-current"
                        >
                        <path d="M248,8C111.033,8,0,119.033,0,256s111.033,248,248,248,248-111.033,248-248S384.967,8,248,8Zm122.309,169.672-39.125,184.938c-2.953,13.266-10.844,16.625-22,10.375l-61-45.016-29.469,28.375c-3.25,3.25-6,6-12.281,6l4.406-62.281,113.625-102.5c5-4.406-1.094-6.875-7.75-2.469l-140.438,88.594-60.5-18.938c-13.156-4.094-13.266-13.156,2.75-19.469l236.75-91.219C373.06,152.547,382.5,158.875,370.309,177.672Z" />
                    </svg>

                  </a>
                </li>
                <li>
                  <a
                    className="flex items-center justify-center text-indigo-500 transition hover:text-indigo-400"
                    href="https://instagram.com/edvent.uz"
                    aria-label="Instagram"
                  >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 270 230"
                    className="w-8 h-8 text-indigo-500 fill-current"
                    >
                    <path d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
                          c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
                          c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
                          c17.455,0,31.656,14.201,31.656,31.655V122.407z" />
                    <path d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
                                          C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
                                          c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z" />
                    <path d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
                                          c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
                                          C135.661,29.421,132.821,28.251,129.921,28.251z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
