import Navbar from "@/components/Navbar";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const Nav = async() => {
  const session = await getServerSession(authOptions);

  return <Navbar user={session?.user} />;
}

export default Nav;