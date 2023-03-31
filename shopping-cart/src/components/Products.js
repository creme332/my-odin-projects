import ProdCSS from "./../styles/Products.module.css";
import Card from "./Card";

function Products() {
  return (
    <div className={ProdCSS.products}>
      <h1>Our flavours</h1>
      <input placeholder="Search..." type="text" />
      <div className={ProdCSS.cardContainer}>
        <Card
          title="Natural"
          price="15"
          imgAlt="Natural flavour banana chips"
        />
        <Card
          title="Barbecue"
          price="20"
          imgAlt="Natural flavour banana chips"
        />
      </div>
    </div>
  );
}

export default Products;
