import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import React from "react";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useBasket } from "../../contexts/BasketContext";

function ProductDetail() {
  const divStyle = {
    textAlign: "center",
    alignItems: "center",
    width: "50%",
    position: "relative",
    margin: "auto",
  };

  const descriptionStyle = {
    textAlign: "justify",
  };

  const { product_id } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", product_id], () =>
    fetchProduct(product_id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  const findBasketItem = items.find((item) => item._id === product_id);

  console.log(data);

  const images = data.photos.map((url) => ({ original: url }));
  console.log("images", images);
  console.log(process.env.REACT_APP_BASE_ENDPOINT);

  return (
    <div style={divStyle}>
      <Text as="h2" fontSize="2xl">
        {data.title}
      </Text>
      <Text>{moment(data.createdAd).format("DD/MM/YYYY")}</Text>
      <p style={descriptionStyle}>{data.description}</p>

      <Button
        colorScheme={findBasketItem ? "blue" : "orange"}
        mt={5}
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove From Basket" : "Add To Basket"}
      </Button>

      <Box mt={5}>
        <ImageGallery size="200px" items={images} />
      </Box>
    </div>
  );
}

export default ProductDetail;
