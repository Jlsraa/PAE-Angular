import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../../Product';
import { ProductosService } from '../../productos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  producto: Product;
  uid: number;

  constructor(private productService: ProductosService,
              private route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.uid = params['uid'] 
      this.producto = this.productService.readProduct(this.uid)
    });
    
  }

  submitForm(form: NgForm){
    console.log("formulario enviado");
    console.log(this.producto.uid);
  }

}
