import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { UserMenu } from "./user-menu";
import { SignUpButton } from "./sign-up-button";

export async function AuthButton() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <SignUpButton />;
  }

  return (
    <UserMenu
      name={session.user.name}
      email={session.user.email}
      image={session.user.image}
      role={session.user.role}
    />
  );
}
