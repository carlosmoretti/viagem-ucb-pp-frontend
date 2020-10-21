import { HospedagemComponent } from './../hospedagem/hospedagem.component';
import { AtividadeService } from './../../service/atividade-service/atividade.service';
import { AtividadeComponent } from './../atividades/atividade.component';
import { TravelEditResolver } from './../../resolvers/travel/travel.edit.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot } from '@angular/router';
import { TravelDetailComponent } from './detail/traveldetail.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let routes: Routes = [
    {
      path: 'create', component: TravelDetailComponent,
      data: {
        "titulo": "Cadastrar Viagem"
      }
    },
    {
      path: 'edit/:id', component: TravelDetailComponent,
      data: {
        "titulo": "Alterar Viagem"
      },
      resolve: {
        "item": TravelEditResolver
      }
    }
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
    ],
    declarations: [
        TravelDetailComponent,
        AtividadeComponent,
        HospedagemComponent
    ],
    providers: [
      AtividadeService
    ]
})
export class TravelModule {
}
