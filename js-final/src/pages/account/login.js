import LoginForm from "@/components/LoginForm";
export default function Home({ loggedIn, validateLogin }) {
  return <LoginForm validateLogin={validateLogin} />;
}
