import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {
  const pathname = usePathname();

  return (
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center text-gray-500">
      <a href="/">
        <Image
          src="https://raw.githubusercontent.com/thechangelog/changelog.com/master/assets/static/images/brand/changelog-mark-dark.svg"
          width={30}
          height={30}
          alt="logo"
        />
      </a>
      <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex flex-wrap items-center text-base justify-center">
        <Link
          href="/"
          className={`mr-5 hover:text-gray-900 ${
            pathname === "/" ? "underline" : ""
          }`}
        >
          Search
        </Link>
        <Link
          href="/chat"
          className={`mr-5 hover:text-gray-900 ${
            pathname === "/chat" ? "underline" : ""
          }`}
        >
          Chat
        </Link>
      </nav>
    </div>
  );
}

export default Header;
