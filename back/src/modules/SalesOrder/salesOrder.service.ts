import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrderRepository } from './salesOrder.repository';
import { CreateSalesOrderDto } from './dto/salesOrder.dto';
import { MovimientosService } from '../caja/movimientos/movimientos.service';
import { SalesOrderLineRepository } from '../SalesOrderLine/salesOrderLine.repository';
import { ProductRepository } from '../products/products.repository';
import { Estado, TipoMovimiento } from '../caja/caja/caja.enum';
import { SalesOrder, SaleStatus } from './entities/salesOrder.entity';
import { Repository } from 'typeorm';
import { SalesOrderLine } from '../SalesOrderLine/entities/salesOrderLine.entity';
import { Product } from '../products/entities/product.entity';
import { Users } from '../Users/entities/users.entity';
import { Location } from '../Location/entities/location.entity';  
import { LocationRepository } from '../Location/location.repository';

@Injectable()
export class SalesOrderService {
  constructor(
    @InjectRepository(SalesOrder)
    private salesOrderRepository: Repository<SalesOrder>,
    private readonly movimientosService: MovimientosService,
    @Inject(SalesOrderLineRepository)
    private readonly salesOrderLineRepository: Repository<SalesOrderLine>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @Inject(LocationRepository)
    private readonly locationRepository: LocationRepository

  ) {}

  async createSalesOrder(createSalesOrderDto: CreateSalesOrderDto) {
    const { userId, locationId, status = SaleStatus.CONFIRMED } = createSalesOrderDto;
  
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const location = await this.locationRepository.findLocationById(locationId);
  
    if (!user || !location) {
      throw new Error('User or location not found');
    }
  
    const salesOrder = new SalesOrder();
    salesOrder.user = user;
    salesOrder.location = location;
    salesOrder.status = status;
    salesOrder.orderLines = []; 
    salesOrder.totalAmount = this.calculateTotalAmount(salesOrder.orderLines);
  
    return await this.salesOrderRepository.save(salesOrder);
  }
  
  private calculateTotalAmount(orderLines: SalesOrderLine[] = []): number {
    return orderLines.reduce((sum, line) => sum + line.lineTotal, 0);
  }
  

  async confirmOrder(orderId: string, userId: string, productId: string): Promise<void> {
    const order = await this.salesOrderRepository.findOne({
      where: { id: orderId },
      relations: ['orderLines', 'user', 'location'],  
    });

    if (!order) throw new Error('Order not found');

    if (order.status === SaleStatus.CONFIRMED) throw new Error('Order is already confirmed');


    order.status = SaleStatus.CONFIRMED;

    const lines = await this.salesOrderLineRepository.find({
      where: { order: { id: orderId } },
    });

    const totalAmount = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    order.totalAmount = totalAmount;

    await this.salesOrderRepository.save(order);

    const producto = await this.productRepository.findOne({ where: { id: productId } });
    if (!producto) throw new Error('Product not found');

    const usuario = await this.usersRepository.findOne({ where: { id: userId } });
    if (!usuario) throw new Error('User not found');

    

    await this.movimientosService.create({
      descripcion: `Venta: ${order.id}`,
      monto: totalAmount,
      tipoMovimiento: TipoMovimiento.Ingreso,
      usuario: order.user,
      producto,
      ubicacion: order.location,
      estado: Estado.Hecho,
    });
  }


}

