import { Navbar } from "@/features/landing/components/navbar";

export default function MarketingLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
