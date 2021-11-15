import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummy_products = [
  {
    id: "1",
    price: 6,
    title: "book",
    description: "bla bla bla",
  },
  {
    id: "2",
    price: 3,
    title: "mug",
    description: "glup glup glup",
  },
  {
    id: "3",
    price: 12,
    title: "cat",
    description: "marramiau",
  },
  {
    id: "4",
    price: 16,
    title: "pan",
    description: "bla bli bluuuuuu",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy_products.map((product) => {
          return (
            <ProductItem
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
