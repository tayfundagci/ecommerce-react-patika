import { useAuth } from "../../contexts/AuthContext";
// import { useBasket } from "../../contexts/BasketContext";
import { Text, Button, Box } from "@chakra-ui/react";

function Profile({ history }) {
  const { user, logout } = useAuth();
  // const { items } = useBasket();

  const handleLogout = async () => {
    logout(() => {
      history.push("/");
    });
  };

  return (
    <Box mt="5" textAlign="center">
      <Text fontSize="24" fontWeight="bold">
        Profile
      </Text>
      {/* <code>{JSON.stringify(user)}</code> */}
      <Box mt="5" fontSize="18">
        <Text>
          <label style={{ fontWeight: "bold" }}>ID:</label> {user._id}
        </Text>
        <Text>
          <label style={{ fontWeight: "bold" }}>E-mail:</label> {user.email}
        </Text>
        <Text>
          <label style={{ fontWeight: "bold" }}>Role:</label> {user.role}
        </Text>
        {/* <Text>
          <label style={{ fontWeight: "bold" }}>E-mail:</label> {items.title}
        </Text> */}
      </Box>

      <br />

      <Button colorScheme="pink" variat="solid" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default Profile;
