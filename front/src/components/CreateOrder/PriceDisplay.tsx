interface PriceDisplayProps {
    productPrice: number;
    totalAmount:number;
  }
  
  const PriceDisplay: React.FC<PriceDisplayProps> = ({ productPrice, totalAmount }) => (
    <>
      <div className="mb-4">
        <label htmlFor="price" className="block text-[#264653] text-sm font-bold mb-2">
          Precio:
        </label>
        <input
          type="text"
          id="price"
          value={`$${productPrice.toFixed(2)}`}
          readOnly
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none"
        />
      </div>
  
      <div className="mb-4">
        <label htmlFor="totalAmount" className="block text-[#264653] text-sm font-bold mb-2">
          Precio Total:
        </label>
        <input
          type="text"
          id="totalAmount"
          value={`$${totalAmount}`}
          readOnly
          className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none"
        />
      </div>
    </>
  );
  
  export default PriceDisplay;