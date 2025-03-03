import { IRoom } from "@/Interfaces/IUser";

interface RoomSelectorProps {
    rooms: IRoom[];
    roomNumber: string;
    onRoomChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  }
  
  const RoomSelector: React.FC<RoomSelectorProps> = ({ rooms, roomNumber, onRoomChange }) => (
   
  <div className="mb-4">
      <label htmlFor="roomNumber" className="block text-[#264653] text-sm font-bold mb-2">
        Número de Habitación:
      </label>
      <select
        id="roomNumber"
        value={roomNumber}
        onChange={onRoomChange}
        required
        className="border border-[#CD9C8A] rounded w-full py-2 px-3 text-[#264653] hover:cursor-pointer focus:outline-none focus:ring focus:ring-[#FF5100]"
      >
        <option value="">Seleccione una habitación</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.number}>
            {room.name} 
          </option>
        ))}
      </select>
    </div>
  );
  
  export default RoomSelector;