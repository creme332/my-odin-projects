import LoginForm from "@/components/LoginForm";
export default function Home({ accessDashboard }) {
  return (
    <LoginForm
      accessDashboard={accessDashboard}
    />
  );
}
