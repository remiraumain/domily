import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={className}>
      <Image
        alt="Logo"
        src="/images/logo.svg"
        priority
        width={100}
        height={100}
      />
    </Link>
  );
};
