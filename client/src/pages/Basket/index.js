import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Center,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";
import { postOrder } from "../../api";

function Basket() {
  const [address, setAdress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const { items, removeFromBasket, emptyBasket } = useBasket();

  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmitForm = async () => {
    const itemIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(itemIds),
    };

    emptyBasket();
    onClose();

    const response = await postOrder(input);
    console.log(response);
  };

  return (
    <Box>
      {items.length < 1 && (
        <Alert status="warning">You have not any items in your basket</Alert>
      )}

      {items.length > 0 && (
        <>
          <Text
            fontSize="22"
            fontWeight="bold"
            style={{ textAlign: "center" }}
            borderWidth="3px"
            borderStyle="double"
            b
          >
            Total: {total} TL
          </Text>

          <Center>
            <Button mt="2" size="md" colorScheme="orange" onClick={onOpen}>
              Order
            </Button>
          </Center>

          <ul style={{ display: "block", listStyle: "none" }}>
            {items.map((item) => (
              <li
                key={item._id}
                style={{
                  margin: 20,
                  float: "left",
                  textAlign: "center",
                }}
              >
                <Link to={`/product/${item._id}`}>
                  <Text fontSize="20">
                    {item.title} - {item.price} TL
                  </Text>
                  <Image
                    htmlWidth={250}
                    loading="lazy"
                    src={item.photos[0]}
                    alt="basket item"
                  />
                </Link>

                <Button
                  mt="2"
                  size="sm"
                  colorScheme="blue"
                  onClick={() => removeFromBasket(item._id)}
                >
                  Remove from basket
                </Button>
              </li>
            ))}
          </ul>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Order</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleSubmitForm}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;
