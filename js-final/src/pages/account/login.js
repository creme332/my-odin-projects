import LoginForm from "@/components/LoginForm";
export default function Home({ accessDashboard, validateLogin }) {
  return (
    <LoginForm
      validateLogin={validateLogin}
      accessDashboard={accessDashboard}
    />
  );
}
