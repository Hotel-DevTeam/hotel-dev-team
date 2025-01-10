import { IProduct } from "@/Interfaces/IUser";

interface ProductSelectorProps {
    products: IProduct[];
    selectedProduct: string;
    onProductChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  
  const ProductSelector: React.FC<ProductSelectorProps> = ({ products, selectedProduct, onProductChange }) => (
    <div className="mb-3">
      <label htmlFor="product" className="block text-gray-700 text-sm">Selecciona un Producto o Servicio:</label>
      <select
        id="product"
        className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded text-sm"
        value={selectedProduct}
        onChange={onProductChange}
      >
        <option value="">Seleccione un producto</option>
        {products.map((product) => (
          <option key={product.id} value={product.id.toString()}>{product.nombre}</option>
        ))}
      </select>
    </div>
  );
  export default ProductSelector;