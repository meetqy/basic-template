import { HydrateClient } from "~/trpc/server";
import { LoginUp } from "./_components/post";

export default function Home() {

  return (
    <HydrateClient>
      <LoginUp />
    </HydrateClient>
  );
}
