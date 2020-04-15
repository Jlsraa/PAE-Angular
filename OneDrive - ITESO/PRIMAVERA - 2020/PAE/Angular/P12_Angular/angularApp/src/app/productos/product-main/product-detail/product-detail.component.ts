import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../productos.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  uid: number;

  constructor(private productService: ProductosService,
    private route: ActivatedRoute) { 

}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.uid = params['uid'] 
      this.product = this.productService.readProduct(this.uid)
    });
  }

}
