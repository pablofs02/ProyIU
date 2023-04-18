import { createContext, ReactNode, useContext, useState } from "react";
import noRatingProducts from "../data/noRatingProducts.json";

let products = noRatingProducts;

type GlobalProviderProps = {
  children: ReactNode;
};

type GlobalContext = {
  buyedItems: CartItem[];
  setBuyedItems: (items: CartItem[]) => void;
  cartItems: CartItem[];
  addItem: (id: number) => void;
  searchItem: (title: string) => void;
  getQuantity: (id: number) => number;
  decreaseItemQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  setCartItems: (items: CartItem[]) => void;
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
};

type UserInfo = {
  name: string;
  lastName: string;
  email: string;
  address: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

const GlobalContext = createContext({} as GlobalContext);

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  
  const [buyedItems, setBuyedItems] = useState<CartItem[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John",
    lastName: "Cena",
    email: "johncena@example.com",
    address: "5th Avenue",
  });

  /**
   * This function gets the quantity of an item in the cart
   * @param id Id of the item to get quantity of
   * @returns the quantity of the item in the cart
   */
  function getQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      return item.quantity;
    } else {
      return 0;
    }
  }

  /**
   * This function adds an item to the cart or increases the quantity of the item if it already exists in the cart
   * @param id Id of the item to add to cart or increase quantity of
   */
  function addItem(id: number) {
    setCartItems((items) => {
      const item = items.find((item) => item.id === id);
      if (item) {
        return items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...items, { id, quantity: 1 }];
      }
    });
  }

  /**
   * This function change the page to the Store to search for the indicated product
   * @param id Id of the item to search on the store
   */
  function searchItem(title: string) {
    console.log(title);
  }

  /**
   * This function decreases the quantity of an item in the cart or removes the item from the cart if the quantity is 1
   * @param id Id of the item to decrease quantity of
   */
  function decreaseItemQuantity(id: number) {
    setCartItems((items) => {
      const item = items.find((item) => item.id === id);
      if (item) {
        if (item.quantity === 1) {
          return items.filter((item) => item.id !== id);
        }

        return items.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      } else {
        return items;
      }
    });
  }

  /**
   * This function removes an item from the cart
   * @param id Id of the item to remove from the cart
   */
  function removeItem(id: number) {
    setCartItems((items) => {
      return items.filter((item) => item.id !== id);
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        buyedItems,
        setBuyedItems,
        cartItems,
        addItem,
        searchItem,
        getQuantity,
        decreaseItemQuantity,
        removeItem,
        setCartItems,
        userInfo,
        setUserInfo
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

/**
 * This function return a list of recommended items.
 */
export function loadRecommendations() {
    let items = products;
    let res = [];
    let elem = items[0];
    for (let i = 0; i < 3; i++) {
        do {
            let num = Math.floor(Math.random()*items.length);
            elem = items[num];
        } while (res.filter((x) => {return x.id == elem.id}).length != 0 || elem.stock <= 0)
        items = items.filter((x) => {return x != elem});
        res.push(elem);
    }
    return res;
}

/**
 * This function return a list of bestseller items.
 */
export function loadBestsellers() {
    let items = products;
    let res = [];
    let elem = items[0];
    for (let i = 0; i < 3; i++) {
        do {
            let num = Math.floor(Math.random()*items.length);
            elem = items[num];
        } while (res.filter((x) => {return x.id == elem.id}).length != 0)
        items = items.filter((x) => {return x != elem});
        res.push(elem);
    }
    return res;
}

/**
 * This function return a list of onstock items.
 */
export function loadOnStock() {
    let items = products;
    let res = [];
    let elem = items[0];
    for (let i = 0; i < 3; i++) {
        do {
            let num = Math.floor(Math.random()*items.length);
            elem = items[num];
        } while (elem.stock <= 0)
        items = items.filter((x) => {return x != elem});
        res.push(elem);
    }
    return res;
}
