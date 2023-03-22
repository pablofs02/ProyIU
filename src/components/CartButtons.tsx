import { useContext } from "react";
import { CartItemContext } from "./CartItem";


function CartButtons() {
    
    const {count, setCount} = useContext(CartItemContext);

    return (
    <div className="cart-buttons">
        <button className="btn btn-primary" onClick={() => {setCount(count + 1)}}>+</button>
        <button className="btn btn-danger" onClick={() => {setCount(count - 1)}}>-</button>
    </div>
  );
}

export default CartButtons;