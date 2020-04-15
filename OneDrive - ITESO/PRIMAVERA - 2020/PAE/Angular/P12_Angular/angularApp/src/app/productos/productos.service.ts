import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: Product[];
  monitoreoId: number[];

  //Observables
  productsSubject = new Subject<Product[]>();
  monitoreoSubject = new Subject<number[]>();

  constructor() {
    this.productos = [
      new Product(1, "Poison", "Arctic Fox", "Tinte semi permanente para cabello", 250, 100, [new Especificacion('Botella', '', '118ml')]),
      new Product(2, "Sunset Orange", "Arctic Fox", "Tinte semi permanente para cabello", 250, 150, [new Especificacion('Botella', '', '118ml')])
    ];
    this.monitoreoId = [];
  }

  /****** Productos ******/
  getProducts(): Product[] {
    return this.productos.slice();
  }
  //Create
  createProduct(producto): void {
    this.productos.push(producto);
    this.productsSubject.next(this.getProducts());
  }
  //Read
  readProduct(uid: number): Product {
    //console.log(uid);
    //console.log(JSON.parse(JSON.stringify(this.productos.find(producto => producto.uid == uid ))));
    return JSON.parse(JSON.stringify(this.productos.find(producto => producto.uid == uid )));
  }
  //Update
  updateProduct(producto): void{
    for(let i = 0; i < this.productos.length; i++){
      if(producto.uid == this.productos[i].uid){
        this.productos[i] = producto;
      } 
    }
    this.productsSubject.next(this.getProducts());
  }
  //Delete
  deleteProduct(uid: number): void {
    console.log("servicio delete" + " " + uid);
    for(let i = 0; i < this.productos.length; i++){
      if(uid == this.productos[i].uid){
        this.productos.splice(i, 1); //Borra producto del arreglo de productos
        this.deleteId(i); //Borra Id de monitoreo
      } 
   }
   this.productsSubject.next(this.getProducts());
  }

  /****** Monitoreo ******/
  getId(): number[]{
    return this.monitoreoId;
  }
  //Create
  createId(uid:number){
    let finId = this.monitoreoId.find(monitorId => monitorId == uid);
    if(finId == undefined){
      this.monitoreoId.push(uid);
      this.monitoreoSubject.next(this.getId());
    }
  }

  //Delete
  deleteId(uid: number){
    for(let i = 0; i < this.monitoreoId.length; i++){
      if(uid == this.monitoreoId[i]){
        this.monitoreoId.splice(i, 1); //Borra id del arreglo de ids
      } 
    }
    this.monitoreoSubject.next(this.getId());
  }

}
