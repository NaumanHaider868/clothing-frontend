import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../../utlis/customAPI";
import { apiError } from "../../../utlis/apiError";
import "../../../assets/css/auth.scss";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [message, setMessage] = useState(token ? "Confirming your email..." : "This verification link is missing.");
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!token) return undefined;
    let active = true;
    api
      .post("/auth/verify-email", { token })
      .then((response) => {
        if (!active) return;
        setOk(true);
        setMessage(response.data.message || "Email verified. You can log in.");
      })
      .catch((error) => {
        if (!active) return;
        setOk(false);
        setMessage(apiError(error, "This verification link is not valid."));
      });
    return () => {
      active = false;
    };
  }, [token]);

  return (
    <div className="flex items-center auth login">
      <div className="w-full max-w-md p-8 space-y-6 m-auto text-center">
        <h2 className="text-[30px] font-semibold">Email</h2>
        <p>{message}</p>
        {ok || !token ? (
          <Link to="/login" className="hover:underline">
            Go to login
          </Link>
        ) : null}
      </div>
    </div>
  );
}
