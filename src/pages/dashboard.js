import Head from 'next/head';
import { useUserProfile } from '@/hooks/useUserProfile';

export default function DashboardPage() {
  const { userName, isLoading } = useUserProfile();


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{userName ? `${userName}'s Dashboard` : 'Dashboard'}</title>
      </Head>
      <h1 className="text-4xl font-bold text-gray-800 text-center">Dashboard</h1>
      {userName ? (
        <p className="text-gray-700 mt-3 text-xl text-center">
          Welcome back, <span className="font-semibold">{userName}</span>!
        </p>
      ) : (
        <p className="text-gray-600 mt-2 text-lg text-center">
          Welcome to your dashboard! (User not identified)
        </p>
      )}
    </>
  );
}
