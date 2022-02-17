import { useAuth } from "../../contexts/AuthContext";
import { Text, Button, Box } from "@chakra-ui/react";

function Profile({ history }) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    logout(() => {
      history.push("/");
    });
  };

  return (
    <Box mt="5" textAlign="center">
      <Text fontSize="24">Profile</Text>
      <code>{JSON.stringify(user)}</code>
      <br />
      <br />
      <Button colorScheme="pink" variat="solid" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default Profile;
