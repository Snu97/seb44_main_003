import { useQuery } from '@tanstack/react-query';
import { GetUserReviews } from '../../../api/api';
import Comments from '../../comments/Comments';
import noContent from '../../../assets/exception/nocontents.svg';
import { styled } from 'styled-components';
import { useState } from 'react';

function ReviewList() {
  const [page, setPage] = useState(1);
  const { data, isSuccess } = useQuery({
    queryKey: ['comments', page],
    queryFn: () => GetUserReviews(page),
    refetchOnWindowFocus: false,
  });

  if (isSuccess) {
    if (!data.reviews.length)
      return (
        <S_Error>
          <img src={noContent} />
          <p>작성한 후기가 없습니다</p>
        </S_Error>
      );
    return (
      <S_Wrapper>
        <Comments data={data} page={page} setPage={setPage} />
      </S_Wrapper>
    );
  }
}

export default ReviewList;

const S_Error = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 0;
  > p {
    margin-top: 20px;
  }
`;

const S_Wrapper = styled.div`
  width: 100%;
  margin: 20px 0;
  /* & img {
    width: 26px;
    height: 26px;
    border-radius: 5px;
    margin-right: 10px;
  }
  > h1 {
    margin: 20px;
    display: flex;
    align-items: center;
  }
  > div:last-child {
    display: flex;
    justify-content: center;
    margin: 20px 0;
    > button {
      margin: 0 10px;
    }
  }
  & svg {
    font-size: 20px;
    margin: 10px 5px;
    color: var(--color-white-80);
  }
  & a {
    text-decoration: underline;
    font-size: 18px;
  } */
`;
