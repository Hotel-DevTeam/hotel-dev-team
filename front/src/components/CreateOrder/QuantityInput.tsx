interface QuantityInputProps {
    quantity: string;
    onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const QuantityInput: React.FC<QuantityInputProps> = ({ quantity, onQuantityChange }) => (
    <div className="mb-4">
      <label htmlFor="quantity" className="block text-[#264653] text-sm font-bold mb-2">
        Cantidad:
      </label>
      <input
        type="number"
        id="quantity"
        value={quantity}
        onChange={onQuantityChange}
        min={1}
        className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none focus:ring focus:ring-[#FF5100]"
      />
    </div>
  );
  export default QuantityInput;