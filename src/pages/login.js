import Head from 'next/head';
import { useLogin } from '../hooks/useLogin';
import LoginFormView from '../components/auth/LoginFormView';

export default function LoginPage() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    successMessage,
    isLoading,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <Head>
        <title>Login</title>
        {/* Using Tailwind via CDN for simplicity, ensure it's properly set up in project */}
        <script src="https://cdn.tailwindcss.com" async></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style jsx global>{`
          body {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row overflow-hidden">
            {/* Left side - Illustration */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-teal-50 to-cyan-100 p-8 sm:p-12 flex flex-col justify-center items-center">
              <div className="w-full max-w-xs">
                <img
                  src="https://placehold.co/400x400/E0F2F7/35A7FF?text=Illustration"
                  alt="Login Illustration"
                  className="w-full h-auto rounded-lg"
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/CCCCCC/FFFFFF?text=Image+Error'; }}
                />
              </div>
            </div>

            {/* Right side - Form View */}
            <LoginFormView
              username={username}
              onUsernameChange={(e) => setUsername(e.target.value)}
              password={password}
              onPasswordChange={(e) => setPassword(e.target.value)}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              successMessage={successMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
