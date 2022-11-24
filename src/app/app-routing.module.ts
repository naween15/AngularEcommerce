import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resolve } from 'dns';
import { AddNewProdiuctComponent } from './components/add-new-prodiuct/add-new-prodiuct.component';
import { AdminComponent } from './components/admin/admin.component';
import { BuyProductComponent } from './components/buy-product/buy-product.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShowProductDetailsComponent } from './components/show-product-details/show-product-details.component';
import { UserComponent } from './components/user/user.component';
import { ViewProductDetailsComponent } from './components/view-product-details/view-product-details.component';
import { AuthGuard } from './_auth/auth.guard';
import { ProductResolveService } from './_services/product-resolve.service';

const routes: Routes = [ 
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  {path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['USER']} },
  {path:'forbidden',component:ForbiddenComponent},
  {path:'addNewProduct',component:AddNewProdiuctComponent,canActivate:[AuthGuard], data:{roles:['ADMIN']},
  resolve:{
    product:ProductResolveService
  }
 
},
  {path:'showProductDetails',component:ShowProductDetailsComponent,canActivate:[AuthGuard], data:{roles:['ADMIN']}},
  {path:'viewProductDetails',component:ViewProductDetailsComponent,resolve:{
    product:ProductResolveService
  }},
  {path:'buyProduct', component:BuyProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
