import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { SalesOrder } from "./entities/salesOrder.entity";

@Injectable()
export class SalesOrderRepository extends Repository<SalesOrder> {}