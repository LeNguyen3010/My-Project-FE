import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { CollectionComponent } from './components/collection/collection.component';
import { BlogComponent } from './components/blog/blog.component';
import { IntroduceComponent } from './components/introduce/introduce.component';
import { DetailproductComponent } from './components/detailproduct/detailproduct.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { OrderComponent } from './components/order/order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductService } from './services/product.service';
import { AddproductComponent } from './components/admin/addproduct/addproduct.component';
import { UpdateproductComponent } from './components/admin/updateproduct/updateproduct.component';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdermanagerComponent } from './components/admin/ordermanager/ordermanager.component';
import { ForgotpassComponent } from './components/forgotpass/forgotpass.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { ChangepassComponent } from './components/changepass/changepass.component';
import { AuthGuard } from './components/_auth/auth.guard';
import { AuthInterceptor } from './components/_auth/auth.interceptor';
import { UserService } from './services/user.service';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ContactComponent,
    CollectionComponent,
    BlogComponent,
    IntroduceComponent,
    DetailproductComponent,
    AdminComponent,
    OrderComponent,
    CheckoutComponent,
    AddproductComponent,
    UpdateproductComponent,
    OrdermanagerComponent,
    ForgotpassComponent,
    ConfirmComponent,
    ChangepassComponent,
    ErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService,
  AuthGuard,{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  UserService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
