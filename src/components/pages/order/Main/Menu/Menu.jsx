import { useContext } from "react";
import styled from "styled-components";
import { theme } from '../../../../../theme/index';
import Card from "../../../reusable-ui/Card";
import { formatPrice } from "../../../../../utils/maths";
import OrderContext from "../../../../../context/OrderContext";
import EmptyMenuAdmin from "./EmptyMenuAdmin";
import EmptyMenuClient from './EmptyMenuClient';

const IMAGE_BY_DEFAULT = "/images/coming-soon.png"

export default function Menu() {

  const { products, isModeAdmin, handleDelete, resetMenu } = useContext(OrderContext)

  if(products.length === 0) {
    if(!isModeAdmin) return <EmptyMenuClient />
    return <EmptyMenuAdmin onReset={resetMenu} />
  }

  return (
    <MenuStyled className="menu">
      {products.map(({id, title, imageSource, price}) => {
        return (
        <Card
          key={id}
          title={title}
          imageSource={imageSource ? imageSource : IMAGE_BY_DEFAULT}
          leftDescription={formatPrice(price)}
          hasDeleteButton={isModeAdmin}
          onDelete={() => handleDelete(id)} />
        )
      })}
      </MenuStyled>
  )
}

const MenuStyled = styled.div`
  background: ${theme.colors.background_white};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-row-gap: 60px;
  padding: 50px 50px 150px;
  justify-items: center;
  box-shadow: ${theme.shadows.strong};
  overflow-y: scroll;
  border-bottom-left-radius: ${theme.borderRadius.extraRound};
  border-bottom-right-radius: ${theme.borderRadius.extraRound};
`