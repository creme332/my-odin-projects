import LoginForm from "@/components/LoginForm";
export default function Home({ loggedIn, validateLogin }) {
  if (!loggedIn) return <LoginForm validateLogin={validateLogin} />;
  return <></>;
}
