import { useState } from "react";
import { useNavigate } from "react-router";
import { loginAdminPI } from "../../server/server";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [captcha, setCaptcha] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
  };

  const handleLogin = async () => {
    try {
      const response: string = await loginAdminPI(
        loginData.email,
        loginData.password
      );

      localStorage.setItem("token", response);
      navigate(`/`);
    } catch (error) {
      console.error("Błąd logowania", error);
      alert("Niepoprawny email lub hasło.");
    }
  };

  return (
    <form className="form-display">
      <input
        className="form-display__input"
        type="email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <input
        className="form-display__input"
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Password"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <ReCAPTCHA
        sitekey="6LfbHjopAAAAAJKj32z_GCaqR0dwiApqU_WBY6-U"
        onChange={(value) => setCaptcha(value)}
      />
      <button
        onClick={() => {
          handleLogin();
        }}
        type="button"
        className="btn-submit btn-submit--login"
        disabled={!captcha}
      >
        Login
      </button>
    </form>
  );
};
export default Login;
