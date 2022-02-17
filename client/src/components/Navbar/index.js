import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Button, Img } from "@chakra-ui/react";

import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to="/">
            <Img
              src="https://w7.pngwing.com/pngs/621/196/png-transparent-e-commerce-logo-logo-e-commerce-electronic-business-ecommerce-angle-text-service.png"
              height="59"
              pl="5"
            />
          </Link>
        </div>

        <ul
          className={styles.menu}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="green">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="blue">Register</Button>
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="orange" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin">
                <Button colorScheme="red">Admin</Button>
              </Link>
            )}

            <Link to="/profile">
              <Button colorScheme="blue">Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
