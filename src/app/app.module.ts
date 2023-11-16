import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { PregledUpisaComponent } from './pregled-upisa/pregled-upisa.component';
import { OdabirKolegijaComponent } from './odabir-kolegija/odabir-kolegija.component';
import { PotvrdaUpisaComponent } from './potvrda-upisa/potvrda-upisa.component';
import { PregledStudenataComponent } from './pregled-studenata/pregled-studenata.component';
import { AdminIzbornikComponent } from './admin-izbornik/admin-izbornik.component';
import { PregledVisokihUcilistaComponent } from './pregled-visokih-ucilista/pregled-visokih-ucilista.component';
import { PregledKolegijaComponent } from './pregled-kolegija/pregled-kolegija.component';
import { PregledStudijaComponent } from './pregled-studija/pregled-studija.component';
import { PregledUpisnihPrijavaComponent } from './pregled-upisnih-prijava/pregled-upisnih-prijava.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PregledUpisaComponent,
    OdabirKolegijaComponent,
    PotvrdaUpisaComponent,
    PregledStudenataComponent,
    AdminIzbornikComponent,
    PregledVisokihUcilistaComponent,
    PregledKolegijaComponent,
    PregledStudijaComponent,
    PregledUpisnihPrijavaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
