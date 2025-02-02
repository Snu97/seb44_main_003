import MainBanner from '../components/banner/MainBanner.tsx';
import MainSliderSection from '../components/slide/mainslider/MainSliderSection.tsx';
import { useSearchParams } from 'react-router-dom';
import useIsLoggedIn from '../hooks/useIsLoggedIn';
import { scrollToTop } from '../utils/scrollToTop.ts';
import { useTokens } from '../hooks/useTokens.ts';
import { REFRSH_TOKEN_DURATION } from '../constant/constantValue.ts';

function Main() {
  const isLoggedIn = useIsLoggedIn();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');
  if (!isLoggedIn && accessToken) {
    useTokens(accessToken, refreshToken);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + REFRSH_TOKEN_DURATION);
    localStorage.setItem('expiration', expiration.toISOString());
    window.location.href = `${import.meta.env.VITE_CLIENT_URL}`;
  }

  scrollToTop();

  return (
    <>
      <MainBanner />
      <MainSliderSection />
    </>
  );
}

export default Main;
