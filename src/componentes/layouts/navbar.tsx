import { Button, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";
import Image from 'next/image';

export default function Header() {
  return (
    <Navbar fluid rounded className="bg-[#4d4dbb] px-2 py-2.5 dark:bg-[#3c3c99]">
      <NavbarBrand as={Link} href="https://agilityfeat.com/">
        <Image
          src="/af-web-small-b.png"
          width={100}
          height={100}
          alt="AgilityFeat"
        />
      </NavbarBrand>
      <div className="flex md:order-2">
        <Button color="secondary">Get started</Button>
      </div>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="https://agilityfeat.com/">Nearshore Team</NavbarLink>
        <NavbarLink href="https://agilityfeat.com/">Nearshore Software Development</NavbarLink>
        <NavbarLink href="https://agilityfeat.com/">Build-Operate-Transfer</NavbarLink>
        <NavbarLink href="https://agilityfeat.com/">AI Solutions</NavbarLink>
        <NavbarLink href="https://agilityfeat.com/">WebRTC</NavbarLink>
        <NavbarLink href="https://agilityfeat.com/">About Us</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
