"use client";

import { LogOut, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "@/i18n/navigation";

interface Props {
  name: string;
  email: string;
  image?: string | null;
  role?: string;
}

export function UserMenu({ name, email, image, role }: Props) {
  const initials =
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase() ?? "U";

  async function handleSignOut() {
    await authClient.signOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="cursor-pointer">
          <AvatarImage src={image ?? ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64">
        <div className="px-2 py-2">
          <p className="font-medium">{name}</p>

          <p className="text-muted-foreground text-sm truncate">{email}</p>
        </div>

        {role === "admin" && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
