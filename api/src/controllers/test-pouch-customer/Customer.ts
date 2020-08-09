import { Customer } from "../../entity/Customer";
import db from '../../entity/test-customer.entity';
import {
  Get,
  Post,
  Body,
  JsonController,
  Authorized,
  QueryParam,
  Param,
  Put,
  Delete
} from "routing-controllers";
import {
  PaginationInfo,
  IPaginationQueryParam
} from "../../decorators/PaginationInfo";
import { CrudServices, IFetchPageQuery } from "../../services/CrudServices";
import { CurrentUser } from "../../decorators/CurrentUser";

@JsonController("/pouch-customers")
// @Authorized()
export class CustomersController {
  private crudServices: CrudServices<Customer>;
  private data: any[]
  db: PouchDB.RelDatabase

  constructor() {
    this.crudServices = new CrudServices<Customer>();
    this.crudServices.setEntity(Customer);
    this.db = db
  }

  @Get("/:id")
  public async getCustomerById(@Param("id") id: string): Promise<any> {
    const res = await this.db.rel.find('customer', id);
    return res || {};
  }
  handleChange(change){

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 

      //A document was added
      else {
        this.data.push(change.doc); 
      }

    }

  }

  @Get()
  public async getCustomers(
    @PaginationInfo() paginationInfo: IPaginationQueryParam,
    @QueryParam("q") search?: string
  ): Promise<any> {
    // const query: IFetchPageQuery = {
    //   search,
    //   perPage: paginationInfo.perPage,
    //   page: paginationInfo.pageNo
    // };
    // return await this.crudServices.fetchPages(query);

      return await this.db.rel.find('customer')
  }

  @Post()
  public async createNewCustomer(
    @Body() Customer: any,
    @CurrentUser() userid: string
  ): Promise<any> {
    return await this.db.rel.save('customer', Customer);
  }

  @Put("/:id")
  public async updateCustomer(
    @Param("id") id: string,
    @Body() data: Customer,
    @CurrentUser() userid: string
  ) {
    const user = await this.db.rel.find('customer', id)[0];
    const updateData = { ...user, ...data }
    const updatedUser = await this.db.rel.save('customer', updateData);
    return updatedUser;
  }

  @Delete("/:id")
  public async deleteCustomer(@Param("id") id: string): Promise<any> {
    return await this.crudServices.deleteById(id);
  }
}
