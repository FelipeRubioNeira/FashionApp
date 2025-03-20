import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function MainIndex() {
  const router = useRouter();

  useEffect(() => {
    router.push({
      pathname: '/ui/(mainStack)/languageScreen',
    });
  }, [router]);

  return null;
}