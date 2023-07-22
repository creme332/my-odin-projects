import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  return <p>Habit ID: {router.query.id}</p>;
}
