import React, { useState } from "react";
import styles from "./styles.module.scss";
import Input from "../../shared/ui/Input";
import Button from "../../shared/ui/Button";
import { useAuthMutation } from "../../features/auth/api/authApi";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [auth] = useAuthMutation();

  const handleChangeForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await auth({
        name: name,
        email: email,
        password: password,
      });
      console.log(response);
      navigate("/login");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className={styles.authContainer}>
      <h2>hello</h2>
      <div>
        <form onSubmit={handleChangeForm}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Name"
          />
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
          <Button text="Register" />
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
