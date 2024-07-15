import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
} from "@nextui-org/react";

import logo from "../../assets/Transaction logo_Mesa de trabajo 1 copy.png";

export default function Nav() {
  return (
    <Navbar>
      {/* ==========> logo <========== */}
      <NavbarBrand>
        <img src={logo} alt="Transaction logo" className="w-11 mr-2" />
        <h1 className="font-bold text-inherit text-xl">Transactions</h1>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* ==========> Nav links <========== */}
        <NavbarItem isActive>
          <Link
            href="#"
            aria-current="page"
            color="secondary"
            className="font-semibold text-lg"
          >
            Dashboard
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* ==========> Profile <========== */}
      <NavbarContent as="div" justify="end">
        <Avatar
          isBordered
          className="transition-transform"
          color="secondary"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </NavbarContent>
    </Navbar>
  );
}
