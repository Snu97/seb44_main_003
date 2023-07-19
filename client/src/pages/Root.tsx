import { Outlet, useLoaderData } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/ui/Footer';
import MobileGNB from '../components/ui/MobileGNB';
import { S_Root, S_Wrapper, S_Container } from '../styles/style';
import { useEffect } from 'react';
import { logout } from '../components/header/Dropdown';
import Modal from '../components/ui/modal/Modal';

function Root() {
  const currentToken = useLoaderData();
  useEffect(() => {
    if (currentToken === 'EXPIRED') {
      logout();
    }
  }, [currentToken]);
  return (
    <S_Root>
      <Header />
      <S_Wrapper>
        <S_Container>
          <Outlet />
          <Modal />
        </S_Container>
      </S_Wrapper>
      <Footer />
      <MobileGNB />
    </S_Root>
  );
}

export default Root;
