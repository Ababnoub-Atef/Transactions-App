import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
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
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
