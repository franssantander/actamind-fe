import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-4 py-12">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/images/actamind.png"
          alt="Actamind logo"
          width={32}
          height={32}
          className="rounded-md"
          priority
        />
        <span className="text-lg font-semibold tracking-tight">Actamind</span>
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
