import { Dialog } from "@headlessui/react"; // Usamos Headless UI para manejar el modal
import CurrencyConverterForm from "../DollarComponents/DollarReservation"; // Importamos el formulario de conversión a dólares

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  pesosAmount: number;
  depositAmount: number;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({
  isOpen,
  onClose,
  pesosAmount,
  depositAmount,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      <Dialog.Panel className="fixed inset-1/4 w-1/2 bg-white p-6 rounded-lg shadow-lg z-50">
        <Dialog.Title className="text-xl font-semibold mb-4 text-gray-800">
          Conversión a Dólares
        </Dialog.Title>
        <CurrencyConverterForm
          pesosAmount={pesosAmount}
          depositAmount={depositAmount}
          onClose={onClose} // Usamos onClose para cerrar el modal
        />
        <button
          className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md"
          onClick={onClose}
        >
          Cerrar
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default CurrencyModal;
