import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";

const NavBar = () => {
  return (
    <nav className="flex space-x-3 mb-6 h-20 items-center">
      <Image src={logo} alt="Logo" style={{ width: "40px", height: "40px" }} />
      <Link href="/" className="text-lg">
        DApp Crowdsale ICO
      </Link>
    </nav>
  );
};

export default NavBar;
