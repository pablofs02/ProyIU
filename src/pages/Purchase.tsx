import { useGlobalContext } from "../context/GlobalContext";
import { PurchaseItem } from "../components/PurchaseItem";
import { Button, Col, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utilities/formatCurrency";
import storeItems from "../data/products.json";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useFilterContext } from "../context/FilterContext";

function Purchase() {
  const { cartItems, setCartItems, boughtItems, setBoughtItems } = useGlobalContext();

  const [showPopover, setShowPopover] = useState(false);

  const totalPrice: number = cartItems.reduce((acc, item) => {
    const itemPrice = storeItems.find((storeItem) => storeItem.id === item.id)?.price;
    return acc + itemPrice! * item.quantity;
  }, 0);

  const {handleClearCategory, handleClearRange} = useFilterContext();
    
    useEffect(() => {
        handleClearRange();
        handleClearCategory();
    }, []);

  const handleFinishPurchase = (e: any) => {
    const id: number = boughtItems.length;
    setBoughtItems([...boughtItems, { [id]: cartItems }]);
    setCartItems([]);
    setShowPopover(false);
  };

  const confirmationPurchase = (
    <Popover id="popover-basic">
      <Popover.Header as="h2">Confirmation</Popover.Header>
      <Popover.Body>
        <p className="fs-6">
          <strong>Are you sure you want purchase the items?</strong>
        </p>
        <div className="d-flex justify-content-between">
          <Button variant="primary" onClick={handleFinishPurchase}>
            Confirm purchase
          </Button>
          <Button variant="danger" onClick={() => setShowPopover(false)}>
            Cancel
          </Button>
        </div>
      </Popover.Body>
    </Popover>
  );


  return (
    <>
      <h1 className="page-header">Purchase</h1>

      {cartItems.length > 0 ? (
        <div className="subtotal">
          <p>
            <strong>Total price: {formatCurrency(totalPrice)}</strong>
          </p>
          <OverlayTrigger trigger="click" placement="right" overlay={confirmationPurchase} show={showPopover}>
                <Button
                  onClick={() => setShowPopover(true)}
                  variant="warning"
                  className="">
                  Finish purchase
                </Button>
          </OverlayTrigger>
        </div>
      ) : (
        <div className="purchase-finished">
          <h2>Purchase finished correctly</h2>
        </div>
      )}
      <section className="cuerpo mt-4">
        <Row md={2} lg={3} xs={1} className="g-3">
          {cartItems.map((item: any) => (
            <Col key={item.id}>
              <PurchaseItem {...item}></PurchaseItem>
            </Col>
          ))}
        </Row>
      </section>
    </>
  );
}

export default Purchase;