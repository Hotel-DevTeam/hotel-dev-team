/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { fetchDollarRate } from "../Fetchs/DollarFetch/fetchDollarRate"; // Asegúrate de importar la función para obtener la tasa

interface CurrencyConverterFormProps {
  pesosAmount: number;
  depositAmount: number;
  onClose?: () => void;
}

const CurrencyConverterForm: React.FC<CurrencyConverterFormProps> = ({
  pesosAmount,
  depositAmount,
}) => {
  const [dollarRate, setDollarRate] = useState<number>(0);
  const [totalPriceUSD, setTotalPriceUSD] = useState<number>(0);
  const [depositUSD, setDepositUSD] = useState<number>(0);
  const [balanceUSD, setBalanceUSD] = useState<number>(0); // Nuevo estado para el saldo a abonar en dólares

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const rateData = await fetchDollarRate();
        // Buscar el objeto con el código USD
        const usdRate = rateData.results.detalle.find(
          (item: { codigoMoneda: string }) => item.codigoMoneda === "USD"
        );
        if (usdRate) {
          const rate = usdRate.tipoCotizacion; // Usamos el tipoCotizacion para el cálculo
          setDollarRate(rate);
          console.log("Tasa de cambio obtenida:", rate); // Log para verificar la tasa
          setTotalPriceUSD(pesosAmount / rate);
          setDepositUSD(depositAmount / rate);
        } else {
          console.error("No se encontró la tasa de cambio para USD");
        }
      } catch (error) {
        console.error("Error al obtener la tasa de cambio:", error);
      }
    };

    fetchRate();
  }, [pesosAmount, depositAmount]);

  useEffect(() => {
    // Calculamos el saldo a abonar en dólares
    const calculatedBalanceUSD = totalPriceUSD - depositUSD;
    setBalanceUSD(calculatedBalanceUSD);

    console.log("Monto total en USD:", totalPriceUSD);
    console.log("Depósito en USD:", depositUSD);
    console.log("Saldo a abonar en USD:", balanceUSD);
  }, [totalPriceUSD, depositUSD]);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-[#264653]">
        Conversión a Dólares
      </h3>
      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Total en Dólares:
          </label>
          <input
            type="text"
            value={`$${totalPriceUSD.toFixed(2)}`}
            readOnly
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Depósito en Dólares:
          </label>
          <input
            type="text"
            value={`$${depositUSD.toFixed(2)}`}
            readOnly
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>

        {/* Nuevo campo: Saldo a abonar en dólares */}
        <div>
          <label className="block text-sm font-medium text-[#264653] mb-1">
            Saldo a abonar en Dólares:
          </label>
          <input
            type="text"
            value={`$${balanceUSD.toFixed(2)}`}
            readOnly
            className="border border-[#CD9C8A] rounded-lg w-full px-3 py-2 text-[#264653] focus:outline-none focus:ring-2 focus:ring-[#FF5100]"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterForm;
