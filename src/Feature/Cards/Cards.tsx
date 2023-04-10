import * as Styled from './styles';

import ArtCard from '../../Components/Art-Cart/Art-Cart';

const Cards = () => {
  return (
    <Styled.Cards justify="flex-start" gap={1.8}>
      <ArtCard />
      <ArtCard />
      <ArtCard />
      <ArtCard />
    </Styled.Cards>
  );
};

export default Cards;
