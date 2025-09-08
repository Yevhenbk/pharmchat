import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import ViewWrapper from "@/components/ViewWrapper";
import HomeView from "@/components/HomeView";

const Page = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) {
    redirect("/chat");
  }

  const authLink = `relative flex items-center justify-center rounded-md text-center 
  h-12 text-base bg-[#ffffff] text-black hover:bg-[#bbbbbb] disabled:bg-zinc-50 font-medium`;

  return (
    <ViewWrapper>
      <HomeView>
        <RegisterLink className={authLink}>Sign Up</RegisterLink>
        <LoginLink className={authLink}>Sign In</LoginLink>
      </HomeView>
    </ViewWrapper>
  );
};

export default Page;
