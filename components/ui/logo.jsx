import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logos.png";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0" aria-label="Cruip">
      <Image src={logo} alt="Cruip Logo" width={200} height={200} className="w-30 md:w-40 lg:w-60 xs:w-20 sm:w-20"/>
    </Link>
  );
}
