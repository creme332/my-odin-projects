import ProdCSS from "./../styles/Products.module.css";
import Card from "./Card";
import chiliSrc from "./../assets/images/chilli.png";
import naturalSrc from "./../assets/images/leaf.png";
import limeSrc from "./../assets/images/lime.png";

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
          imgSrc={naturalSrc}
        />
        <Card
          title="Barbecue"
          price="20"
          imgAlt="Natural flavour banana chips"
          imgSrc={chiliSrc}
        />

        <Card
          title="Lime"
          price="20"
          imgAlt="Natural flavour banana chips"
          imgSrc={limeSrc}
        />
      </div>
    </div>
  );
}

export default Products;
