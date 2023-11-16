import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {PregledUpisaComponent} from "./pregled-upisa/pregled-upisa.component";
import {OdabirKolegijaComponent} from "./odabir-kolegija/odabir-kolegija.component";
import {PotvrdaUpisaComponent} from "./potvrda-upisa/potvrda-upisa.component";
import {PregledStudenataComponent} from "./pregled-studenata/pregled-studenata.component";
import {AdminIzbornikComponent} from "./admin-izbornik/admin-izbornik.component";
import {PregledVisokihUcilistaComponent} from "./pregled-visokih-ucilista/pregled-visokih-ucilista.component";
import {PregledKolegijaComponent} from "./pregled-kolegija/pregled-kolegija.component";
import {PregledStudijaComponent} from "./pregled-studija/pregled-studija.component";
import {PregledUpisnihPrijavaComponent} from "./pregled-upisnih-prijava/pregled-upisnih-prijava.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'pregled-upisa', component: PregledUpisaComponent},
  {path: 'odabir-kolegija', component: OdabirKolegijaComponent},
  {path: 'potvrda-upisa', component: PotvrdaUpisaComponent},
  {path: 'admin-izbornik', component: AdminIzbornikComponent},
  {path: 'pregled-studenata', component: PregledStudenataComponent},
  {path: 'pregled-visokih-ucilista', component: PregledVisokihUcilistaComponent},
  {path: 'pregled-kolegija', component: PregledKolegijaComponent},
  {path: 'pregled-studija', component: PregledStudijaComponent},
  {path: 'pregled-upisnih-prijava', component: PregledUpisnihPrijavaComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
