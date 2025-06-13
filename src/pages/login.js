import Head from 'next/head';
import LoginFormView from '../components/auth/LoginFormView'; 
import { useLogin } from '../hooks/useLogin'; 

export default function LoginPage() {
  const {
    username,
    onUsernameChange,
    password,
    onPasswordChange,
    onSubmit,
    isLoading,
    error,
    successMessage,
    showPassword,
    toggleShowPassword
  } = useLogin();

  return (
    <>
      <Head>
        <title>Login</title>
        <script src="https://cdn.tailwindcss.com" async></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style jsx global>{`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-[#fffaf0] px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl flex max-w-4xl w-full">
          {/* Kiri: Gambar Ilustrasi */}
          <div className="w-1/2 hidden md:flex items-center justify-center">
            <img
              src="/img/login-illustration.png"
              alt="Login Illustration"
              className="w-[80%] max-w-[250px]"
            />
          </div>

          {/* Kanan: Form Login */}
          <LoginFormView
            username={username}
            onUsernameChange={onUsernameChange}
            password={password}
            onPasswordChange={onPasswordChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
            error={error}
            successMessage={successMessage}
            showPassword={showPassword}
            toggleShowPassword={toggleShowPassword}
          />
        </div>
      </div>
    </>
  );
}