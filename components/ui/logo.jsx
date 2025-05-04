import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo_light.png";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Cruip">
      <Image src={logo} alt="Cruip Logo" className="w-30 md:w-50 lg:w-70 xs:w-20 sm:w-20"/>
    </Link>
  );
}
