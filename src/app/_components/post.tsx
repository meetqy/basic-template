"use client";
import { authClient } from "~/server/auth/client";

export function LoginUp() {
  const signUp = async () => {
    const res = await authClient.signUp.email({
      name: "test",
      email: "test@qq.com",
      password: "12345678",
    });

    console.log(res);
  };

  return <button onClick={signUp}>LoginUp</button>;
}
