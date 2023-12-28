import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { CollectionComponent } from './components/collection/collection.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegisterComponent } from './components/register/register.component';
import { IntroduceComponent } from './components/introduce/introduce.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderComponent } from './components/order/order.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddproductComponent } from './components/admin/addproduct/addproduct.component';
import { UpdateproductComponent } from './components/admin/updateproduct/updateproduct.component';
import { OrdermanagerComponent } from './components/admin/ordermanager/ordermanager.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'blog', component: BlogComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'collection', component:CollectionComponent},
  { path: 'introduce',component:IntroduceComponent},
  { path: 'detailproduct/:id',component:DetailproductComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'order' , component:OrderComponent},
  { path: 'admin', component:AdminComponent},
  { path: 'addproduct', component:AddproductComponent},
  { path: 'updateproduct/:id', component:UpdateproductComponent},
  { path: 'ordermanager',component:OrdermanagerComponent},
  { path: 'forgotpassword',component:ForgotpassComponent},
  { path: 'confirm',component:ConfirmComponent},
  { path: 'changepassword',component:ChangepassComponent},
  { path: 'error', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
