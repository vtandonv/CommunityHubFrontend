import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryID: number = 1;
  previousCategoryID: number = 1;
  searchMode: boolean = false;
  
  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  
  previousKeyword: string = null;
  
  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    
  }

  listProducts() {
    
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();

    }
    
  }
  handleSearchProducts() {
   
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than than previous
    // then set thePageNumber to 1
    
    
    // search products using keyword 

    if(this.previousKeyword != theKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`);

 
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                theKeyword).subscribe(this.processResult());
  }
  handleListProducts(){
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    
    if(hasCategoryId){
      //get the "id" param string. convert string to a number using the "+"
       this.currentCategoryID = +this.route.snapshot.paramMap.get('id');
    }

    else {
       //category id not available ... default to category id 1
       this.currentCategoryID = 1;
    }
    
    //Check if a we have a different category than previous
    //Angular will reuse a component if it is currently being viewed

    //If we have a different category id than previous
    //then set thePageNUmber back to 1

    if(this.previousCategoryID!=this.currentCategoryID){
      this.thePageNumber = 1;
    }

    this.previousCategoryID = this.currentCategoryID;

    console.log(`currentCategoyID=${this.currentCategoryID}, thePageNumber=${this.thePageNumber}`);
   
    
    
    //now get the products for the given category id
    
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryID)
                                               .subscribe(this.processResult());
      
     

  }
  //Assigning data that came back from spring data rest (RHS) to the properties defined in the class (LHS)
  processResult() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1; //+1 is done because in spring data rest pages start from 0 but in the pagination component of angular they start from 1 
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  updatePageSize(pageSize: number){
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product)
  {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
