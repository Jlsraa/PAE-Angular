import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductosService } from 'src/app/productos/productos.service';
import { Product } from 'src/app/productos/Product';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() uid: number;
  @Input() mode: boolean;
  @Output() checked = new EventEmitter();
  product: Product;
  

  constructor(private productService: ProductosService) {
  }

  ngOnInit(): void {
    this.product = this.productService.readProduct(this.uid);
  }

  checkProduct(event){
    let isChecked = event.target.checked;
    let productId = this.uid;
    let emitData = {
      id: productId,
      ischecked: isChecked
    }
    this.checked.emit(emitData);
  }

  productDelete(event){
    if(this.mode == false){
      this.productService.deleteProduct(this.uid);
    }else{
      this.productService.deleteId(this.uid);
    }
  }

}
