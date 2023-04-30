import { useState, useEffect } from "react";
import { Alert, Offcanvas } from "react-bootstrap";
import { useGlobalContext } from "../context/GlobalContext";
import { useFilterContext } from "../context/FilterContext";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";

function Filter() {
  const [show, setShow] = useState(false);

  const {
    minPrice,
    maxPrice,
    selectedCategories,
    handleCheckboxChange,
    handleClearCategory,
    handleClearRange,
    handleMaxPriceChange,
    handleMinPriceChange,
    handleActiveFilter,
  } = useFilterContext();

  useEffect(() => {
    handleClearRange();
    handleClearCategory();
  }, []);

  return (
    <>
      <div className="filter">
        <>
          <button
            className="show-filter"
            onClick={() => {
              setShow(true);
            }}>
            Filter options...
            {!show ? <AiFillCaretRight /> : <AiFillCaretDown />}
          </button>
          <span className="text-muted ms-4">
            {selectedCategories.length && !show
              ? "Categories selected: " + selectedCategories.join(", ")
              : null}
          </span>
        </>
      </div>
      <Offcanvas
        show={show}
        onHide={() => {
          setShow(!show);
        }}
        scroll={true}
        backdrop={false}
        className="filter-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="filter-options p-0">
          <div className="filter-range filters">
            <div className="filter-header">
              <h5>Price range</h5>
              <button onClick={handleClearRange}>Clear</button>
            </div>
            <div className="filter-range-options">
              <span className="text-muted">Min €</span> <span className="text-muted">Max €</span>
              {/* split="0.01" shows decimal values */}
              <input
                type="number"
                name="min"
                value={minPrice}
                onChange={handleMinPriceChange}
                min="0"
                placeholder="0.00"
              />
              <input
                type="number"
                name="max"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                min="0"
                placeholder="10000.00"
              />
            </div>
            {minPrice > maxPrice ? ( <Alert className="mt-3" variant="danger">The max price should be greater than the min price </Alert> ) : <></>}
          </div>
          <div className="filter-category filters">
            <div className="filter-header">
              <h5>Category</h5>
              <button onClick={handleClearCategory}>Clear</button>
            </div>
            <div className="filter-category-options">
              {/* Men's clothing */}
              <div>
                <input
                  type="checkbox"
                  value="men's clothing"
                  checked={selectedCategories.includes("men's clothing")}
                  onChange={handleCheckboxChange}
                  id="men's clothing"
                />
                <label htmlFor="men's clothing">Men's clothing</label>
              </div>

              {/* Jewelry */}
              <div>
                <input
                  type="checkbox"
                  value="jewelry"
                  checked={selectedCategories.includes("jewelry")}
                  onChange={handleCheckboxChange}
                  id="jewelry"
                />
                <label htmlFor="jewelry">Jewelry</label>
              </div>

              {/* Electronics */}
              <div>
                <input
                  type="checkbox"
                  value="electronics"
                  checked={selectedCategories.includes("electronics")}
                  onChange={handleCheckboxChange}
                  id="electronics"
                />
                <label htmlFor="electronics">Electronics</label>
              </div>

              {/* Women's clothing */}
              <div>
                <input
                  type="checkbox"
                  value="women's clothing"
                  checked={selectedCategories.includes("women's clothing")}
                  onChange={handleCheckboxChange}
                  id="women's clothing"
                />
                <label htmlFor="women's clothing">Women's clothing</label>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
        <div className="filter-button">
          <button
            onClick={(e) => {
              if (minPrice < maxPrice ) {
                handleActiveFilter(e);
                setShow(false);
              } 
            }}>
            Filter
          </button>
        </div>
      </Offcanvas>
    </>
  );
}

export default Filter;