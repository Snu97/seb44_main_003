import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import BannerSlide from '../components/slide/BannerSlide';
import GenreSlide from '../components/slide/GenreSlide';
import styled from 'styled-components';
import ListBtns from '../components/ui/ListBtns';
import { scrollToTop } from '../utils/scrollToTop';
import { BannerImgsType } from '../types/types'
import bannerTvImg1 from '../assets/banner_image/마당이 있는 집.webp';
import bannerTvImg2 from '../assets/banner_image/최애의 아이.webp';
import bannerTvImg3 from '../assets/banner_image/셀러브리티.webp';
import bannerTvImg4 from '../assets/banner_image/킹더랜드.webp';
import bannerTvImg5 from '../assets/banner_image/이번 생도 잘 부탁해.webp';



function TV() {
  const [visibleGenres, setVisibleGenres] = useState<Array<string>>([]);
  const currentIndex = useRef(4);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const bannerTvImgs: BannerImgsType = [
    {
      name: bannerTvImg1,
      alt: '마당이 있는 집',
      url: 'http://localhost:5173/content/4'
    },
    {
      name: bannerTvImg2,
      alt: '최애의 아이',
      url: 'http://localhost:5173/content/8'
    },
    {
      name: bannerTvImg3,
      alt: '셀러브리티',
      url: 'http://localhost:5173/content/59'
    },
    {
      name: bannerTvImg4,
      alt: '킹더랜드',
      url: 'http://localhost:5173/content/19'
    },
    {
      name: bannerTvImg5,
      alt: '이번 생도 잘 부탁해',
      url: 'http://localhost:5173/content/11'
    },
  ];

  const genres: string[] = [
    '액션',
    '드라마',
    'SF',
    '스릴러',
    '애니메이션',
    '코미디',
    '가족',
    '판타지',
    '로맨스',
    '공포',
    '범죄',
    '스포츠',
    '음악',
    'Made in Europe',
    'Reality TV',
    '역사',
    '다큐멘터리',
    '전쟁',
    '서부'
  ];

  useEffect(() => {
    const genreSlice = genres.slice(0, currentIndex.current);
    setVisibleGenres(genreSlice);
  }, [])

  const addMoreGenres = () => {
    const newGenres = genres.slice(currentIndex.current, currentIndex.current + 4);
    setVisibleGenres((genre) => [...genre, ...newGenres]);
    currentIndex.current = currentIndex.current + 4;
  }

  useEffect(() => {
    let timeoutId: number;

    if (inView && visibleGenres.length < genres.length) {
      timeoutId = setTimeout(() => {
        addMoreGenres()
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inView, visibleGenres.length < genres.length]);

  scrollToTop();

  return (
    <S_Wrapper>
      <BannerSlide bannerImgs={bannerTvImgs}/>
      <ListBtns />
      {visibleGenres.map((genre) => (
        <>
          <GenreSlide genre={genre} path='tv' />
        </>
      ))}
      <div ref={ref} className="target"></div>
    </S_Wrapper>
  );
}

export default TV;

const S_Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100vw;

  .target {
    height: 10px;
  }
`;
