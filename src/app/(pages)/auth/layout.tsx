import {
  Card,
} from "@/components/ui/card";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex-1 flex items-center justify-center">
      <Card className="w-full md:w-5/12 -mt-24">
        {children}
      </Card>
    </div>
  );
}
