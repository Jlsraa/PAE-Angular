import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../productos.service'
import { Product } from '../../Product';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList: Product[];
  monitoreoid: number[];
  query = '';
  productListCopy = [];
  isChecked = [];
  mode = false;

  //Subscripcion
  productsSubscription = new Subscription();
  private subscribe: Subscription;

  constructor(private productService: ProductosService,
    private location: Location) {
      if (this.location.path() == "/monitoreo") {
        this.mode = true;
      }
    this.filterProducts();
    this.productListCopy = [...this.productList];

    //Prueba
    this.productService.productsSubject.subscribe((data) => {
      //console.log(data);
      this.productList = data;
    })
  }

  //Search
  searchProduct(event) {
    let productSearch = [];
    this.productList = [...this.productListCopy];
    if (!this.query) { return; }
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].nombre.toLowerCase().indexOf(this.query.toLowerCase()) != (-1)
        || this.productList[i].descripcion.toLowerCase().indexOf(this.query.toLowerCase()) != (-1)) {
        productSearch.push(this.productList[i]);
      }
    }
    this.productList = productSearch;
  }

  //Checkbox
  checkedEvent(event) {
    //Agregar o quitar del arreglo si esta o no checked
    console.log(event);
    if (event.ischecked == true) {
      this.isChecked.push(event.id);
      
    } else {
      let found = this.isChecked.indexOf(event.id);
      this.isChecked.splice(found, 1);
    }
  }

  //Add product to monitor
  addProductMonitor(event) {
    console.log(this.isChecked);
    for (let i = 0; i < this.isChecked.length; i++) {
      this.productService.createId(this.isChecked[i]);
    }
  }

  //Filter products
  filterProducts(){
    this.productList = this.productService.getProducts();
    if (this.mode == true) {
      this.monitoreoid = this.productService.getId();
      console.log(this.monitoreoid);
      this.productList = this.productList.filter((product) => {
        let indexMonitor = this.monitoreoid.indexOf(product.uid);
        if (indexMonitor != -1) {
          return true;
        } else {
          return false;
        }
      });
    }
  }


  ngOnInit(): void {
    if (this.mode) {
      this.subscribe = this.productService.monitoreoSubject.subscribe((updateId) => {
        this.monitoreoid = updateId;
        this.filterProducts();
        this.productListCopy = [...this.productList]; 
      });
    } else {
      this.subscribe = this.productService.productsSubject.subscribe((updateProduct) => {
        this.productList = updateProduct;
      });
    };
  }

}
