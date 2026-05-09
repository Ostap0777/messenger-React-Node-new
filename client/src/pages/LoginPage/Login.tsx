import { useState } from "react";
import Button from "../../shared/ui/Button";
import Input from "../../shared/ui/Input";
import styles from "./styles.module.scss";
import { useLoginMutation } from "../../features/auth/api/loginApi";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleChangeForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    try {
      const response = await login({
        email,
        password,
      }).unwrap();
      console.log(response);
      localStorage.setItem("accessToken", response.accessToken);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  const handleOpenAuth = async (e: React.FormEvent) => {
    console.log("register");
    e.preventDefault();
    navigate("/register");
  };
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  return (
    <div className={styles.loginContainer}>
      <h2>hello</h2>
      <div>
        <form onSubmit={handleChangeForm}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Login"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <Button text="Login" />
        </form>
        <div onClick={handleOpenAuth}>Register</div>
      </div>
    </div>
  );
}

export default LoginPage;
