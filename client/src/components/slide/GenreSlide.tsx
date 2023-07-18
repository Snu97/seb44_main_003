import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetTVData, GetMovieData } from '../../api/api';
import { ContentData } from '../../types/types';
import ItemCard from '../ui/ItemCard';
import SliderLoading from '../ui/exceptions/sliderLoading';
import styled from 'styled-components';
import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

// install Virtual module
SwiperCore.use([Virtual, Navigation]);

const GenreSlide = ({ genre, path }: { genre: string, path: 'tv'|'movie' }) => {
  const [, setSwiperRef] = useState<SwiperCore | null>(null);
  const [size, setSize] = useState(getSize());

  function getSize() {
    const width = window.innerWidth;

    if (width <= 480) {
      return 6;
    } else if (width <= 770) {
      return 8;
    } else if (width <= 1024) {
      return 12;
    } else {
      return 14;
    }
  }

  const breakpoints = {
    0: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 10 },
    480: { slidesPerView: 3, slidesPerGroup: 2, spaceBetween: 10 },
    770: { slidesPerView: 4, slidesPerGroup: 3, spaceBetween: 14 },
    1024: { slidesPerView: 5, slidesPerGroup: 4, spaceBetween: 16 },
    1200: { slidesPerView: 6, slidesPerGroup: 5, spaceBetween: 18 }
  };

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery(
    path === 'tv' ? ['tvGenreSlide', genre] : ['movieGenreSlide', genre],
    ({ pageParam = 1 }) =>
      path === 'tv'
        ? GetTVData(genre, size, pageParam)
        : GetMovieData(genre, size, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage.currentPage;
        const totalPages = lastPage.totalPages;
        if (currentPage < totalPages) {
          return currentPage + 1;
        }

        return undefined;
      },
    }
  )

  const handleNextPage = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.className === 'swiper-button-next') {
      if (!hasNextPage) {
        return
      }
      fetchNextPage()
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setSize(getSize());
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (status === 'loading') {
    return (
      <>
        <S_GenreTitle>{genre}</S_GenreTitle>
        <S_LoadingBox>
          <SliderLoading />
        </S_LoadingBox>
      </>
    )
  }

  if (status === 'error') return <div>Error</div>;
  
  if (status === 'success' && data.pages[0].content.length > 0) {
    return (
      <>
        <S_GenreTitle>{genre}</S_GenreTitle>
        <S_SwiperBox onClick={(e: React.MouseEvent) => handleNextPage(e)}>
          <S_Swiper
            onSwiper={setSwiperRef}
            slidesPerView={6} // 한 슬라이드에 보여줄 갯수
            slidesPerGroup={5} // 한 번에 넘어가는 슬라이드 그룹의 개수
            centeredSlides={false} // 센터 모드
            spaceBetween={18} // 슬라이드 사이 여백
            navigation={true} // 버튼
            watchOverflow={true} // 슬라이드가 1개 일 때 pager, button 숨김 여부 설정
            breakpoints={breakpoints}
            virtual
          >
            {data.pages.map((page) => (
              <>
                {page.content.map((item: ContentData) => (
                  <S_SwiperSlide key={item.id}>
                    <ItemCard item={item} />
                  </S_SwiperSlide>
                ))}
              </>
            ))}
          </S_Swiper>
        </S_SwiperBox>
      </>
    );
  }
};

export default GenreSlide;

const S_SwiperBox = styled.div`
  position: relative;
  overflow-x: hidden; // 가로 스크롤 숨김
  margin: 0;
  padding: 0px 3.75rem;
  width: 100%;
`;

const S_Swiper = styled(Swiper)`
  display: flex;
  overflow: visible; // 요소의 내용이 요소의 크기를 넘어갈 경우에도 내용을 표시
  margin-top: 1.25rem;
  margin-bottom: 3.75rem;

  .swiper-button-prev,
  .swiper-button-next {
    top: 50%;
    margin: 0;
    padding: 1.5rem;
    height: 100%;
    transform: translateY(-50%);
    background-repeat: no-repeat;
    background: var(--color-bg-60);
    color: var(--color-white-100);
    text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    z-index: 10;
    --swiper-navigation-size: 2.5rem;
    opacity: 0;
  }
  .swiper-button-prev {
    left: -3.75rem;
  }
  .swiper-button-next {
    right: -3.75rem;
  }

  .swiper-button-disabled {
    display: none; // 처음, 마지막 슬라이드에 도달하면 화살표 비활성화
  }

  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
      transition: opacity 0.3s ease;
    }
  }
`;

const S_SwiperSlide = styled(SwiperSlide)`
  display: flex;
  cursor: pointer;
`;

const S_LoadingBox = styled.div`
  margin-top: 15px;
  padding: 0px 3.75rem;
`;

const S_GenreTitle = styled.h2`
  margin: 28px 0 5px 0;
  padding: 0px 3.75rem;
  color: var(--color-white-100);
  font-size: 24px;
  font-weight: 700;
`;