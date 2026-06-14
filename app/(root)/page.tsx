import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/queries/product.queries";

export const metadata = {
  title: "Home",
};
const Homepage = async () => {
  const latestProducts = await getLatestProducts();
  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrivals" limit={4} />
    </>
  );
};

export default Homepage;
