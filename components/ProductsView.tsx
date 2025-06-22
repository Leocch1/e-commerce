import { Category, Product } from "@/sanity.types";
import ProductGrid from "./ProductGrid";
import { CategoriesSelectorComponent } from "./ui/category-selector";

interface ProductsViewProps {
    products: Product[];
    categories: Category[];
    showCategories?: boolean;
}

const ProductsView = ({ products, categories, showCategories}: ProductsViewProps) => {
    return <div className="flex flex-col">
        {/*categories*/}
        {showCategories && (
        <div className="w-full sm:w-[200px]">
          <CategoriesSelectorComponent categories={categories} />
        </div>
      )}

        {/*products*/}
        <div className="flex-1">
            <div>
                <ProductGrid products={products} />

                <hr className="w-1/2 sm:w-3/4" />
            </div>
        </div>
    </div>
};

export default ProductsView;