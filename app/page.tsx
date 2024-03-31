import Search from "@/components/Search";
import UsersTable from "@/components/UsersTable";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Title, Card } from "@tremor/react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type Props = {
  searchParams: {
    q?: string;
  };
};

export default async function Home({ searchParams }: Props) {
  const session = await getServerSession(authOptions);
  const query = searchParams.q;
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
      email: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Users</Title>
      { !session ? (
        redirect("api/auth/signin")) :
        <>
        <Search />
        <Card className="mt-6">
          <UsersTable users={users} />
        </Card>
        </>
      }
    </main>
  );
}
