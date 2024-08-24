import { Button } from "@/components/ui/button";
import { auth, signOut } from "../../auth";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { redirect } from "next/navigation";
import Link from "next/link";

const Auth = async () => {
  const session = await auth();
  

  console.log(session)
  const user = session?.user;
  
  if (user) {
    const firstWord = user.email?.charAt(0);
    return (
      <Popover>
        <PopoverTrigger>
          <div className="w-10 h-10 rounded-full text-center leading-10 bg-gray-600 text-white">
            {firstWord?.toLocaleUpperCase()}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <form action={async () => {
            "use server"
            await signOut({
              redirectTo: "/"
            })
          }}>
            <Button type="submit" variant="ghost">
              退 出
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    )
  }
  console.log(111)
  return <Link href="/auth/sign-in">登 录</Link>
};

export default Auth;
