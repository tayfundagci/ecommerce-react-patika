import { Box, Image, Button } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";

import { useBasket } from "../../contexts/BasketContext";

function Card({ item }) {
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find(
    (basket_item) => basket_item._id === item._id
  );

  return (
    <Box
      borderWidth="3px"
      borderRadius="lg"
      overflow="hidden"
      p="3"
      alignItems="center"
      textAlign="center"
    >
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos[0]} alt="product" loading="lazy" />

        <Box p="6">
          <Box>{moment(item.createdAt).format("DD/MM/YYYY")}</Box>
          <Box marginTop="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {item.title}
          </Box>
          <Box mt="1" fontSize="17px">
            {item.price} TL
          </Box>
        </Box>
      </Link>

      <Button
        colorScheme={findBasketItem ? "blue" : "orange"}
        mt="-3"
        variant="solid"
        onClick={() => addToBasket(item, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>
    </Box>
  );
}

export default Card;
