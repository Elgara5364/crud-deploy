import { Link } from "next-view-transitions";
// import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mb-8">
      <div className="flex gap-5">
        <Link href={"/"}>Home</Link>
        <Link href={"/contacts"}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
