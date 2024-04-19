import SkeletonIndexPage from '@/app/skeletonIndexPage';
import LoginDialog from '@/components/login/LoginDialog';

export default function SignIn() {
  return (
    <>
      <SkeletonIndexPage />
      <LoginDialog providers={process.env.NODE_ENV === 'production' ? ['azure-ad'] : ['azure-ad', 'gitlab']} />
    </>
  );
}
