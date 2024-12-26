import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesOrderRepository } from './salesOrder.repository';
import { CreateSalesOrderDto } from './dto/salesOrder.dto';
import { MovimientosService } from '../caja/movimientos/movimientos.service';
import { SalesOrderLineRepository } from '../SalesOrderLine/salesOrderLine.repository';
import { ProductRepository } from '../products/products.repository';
import { Estado, TipoMovimiento } from '../caja/caja/caja.enum';
import { SaleStatus } from './entities/salesOrder.entity';

@Injectable()
export class SalesOrderService {
  constructor(
    @InjectRepository(SalesOrderRepository)
    private salesOrderRepository: SalesOrderRepository,
    private readonly MovimientosService: MovimientosService,
    private readonly salesOrderLineRepository: SalesOrderLineRepository,
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository,
  ) {}

  async createSalesOrder(createSalesOrderDto: CreateSalesOrderDto) {
    const order = this.salesOrderRepository.create(createSalesOrderDto);
    return this.salesOrderRepository.save(order);
  }

  async confirmOrder(orderId: string, userId: string, productId: string): Promise<void> {
    const order = await this.salesOrderRepository.findOneBy({ id: orderId });
    if (!order) throw new Error('Order not found');
  
    if (order.status === SaleStatus.CONFIRMED) throw new Error('Order is already confirmed');
  
    order.status = SaleStatus.CONFIRMED;
    await this.salesOrderRepository.save(order);
  
    const lines = await this.salesOrderLineRepository.find({
      where: { order: { id: orderId } },
    });
    const totalAmount = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  
    const producto = await this.productRepository.findOneBy({ id: productId });
    if (!producto) throw new Error('Product not found');
  
    const usuario = await this.salesOrderRepository.findOneBy({ id: userId });
    if (!usuario) throw new Error('User not found');
  
    await this.MovimientosService.create({
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

