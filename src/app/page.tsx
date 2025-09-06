import { NextPage } from "next";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import ViewWrapper from "@/components/ViewWrapper";
import HomeView from "@/components/HomeView";
import { authLink } from "@/utils/authLinkStyles";

const Page: NextPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (isLoggedIn) {
    redirect("/chat");
  }

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
