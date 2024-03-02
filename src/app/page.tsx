import { NextPage } from "next"
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"
import ViewWrapper from "@/components/ViewWrapper"
import HomeView from "@/components/HomeView"

const Home: NextPage = async () => {  
  const authLink = `relative flex items-center justify-center rounded-md text-center 
  h-12 text-base bg-[#ffffff] text-black hover:bg-[#bbbbbb] disabled:bg-zinc-50`

  return (
    <ViewWrapper>
      <HomeView>
        <RegisterLink className={authLink}>Sign up</RegisterLink>
        <LoginLink className={authLink}>Sign in</LoginLink>
      </HomeView>
    </ViewWrapper>
  )
}

export default Home