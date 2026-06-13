import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Sparkles } from "lucide-react";

export function Logo() {
  return (
    <>
      <Link
        href="/"
        className="flex gap-2 transition-opacity hover:opacity-80">
        <div className="h-8 w-8 rounded-lg bg-primary">
          <Image
            src="/logo.svg"
            alt="YourApp"
            width={32}
            height={32}
            priority
          />
        </div>
        <div className="flex flex-col justify-center leading-0 gap-3">
          <div className="text-lg font-bold leading-0">izbushka</div>
          <div className="text-xs leading-0">Not Children's Fairy Tales</div>
        </div>
      </Link>
    </>
  );
}
