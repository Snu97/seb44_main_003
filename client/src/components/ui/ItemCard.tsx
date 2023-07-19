import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ContentData } from '../../types/types';

interface ItemProps {
  item: ContentData;
}

const ItemCard: React.FC<ItemProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <S_Wrapper onClick={() => navigate(`/content/${item.id}`)}>
      <S_ItemBox>
        <S_ItemImg src={item.mainPoster} alt={`${item.id}`} />
      </S_ItemBox>
      <S_ItemTitle>{item.title}</S_ItemTitle>
    </S_Wrapper>
  );
};

export default ItemCard;

const S_Wrapper = styled.div`
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-15px);

    @media only screen and (max-width: 480px) {
      transform: translateY(-10px);
    }
  }
`;

const S_ItemBox = styled.div``;

const S_ItemImg = styled.img`
  object-fit: cover;
  aspect-ratio: 3/4.2;
  border-radius: 10px;
  filter: var(--shadow-l-40);
`;

const S_ItemTitle = styled.p`
  margin-top: 10px;
  color: var(--color-white-80);
  font-size: 18px;
  font-weight: 700;
  filter: var(--shadow-l-25);

  @media only screen and (max-width: 1024px) {
    font-size: 16px;
  }
  
  @media only screen and (max-width: 770px) {
    font-size: 14px;
  }

  @media only screen and (max-width: 480px) {
    font-size: 12px;
  }
`;
