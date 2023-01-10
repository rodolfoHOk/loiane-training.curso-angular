import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunosComponent } from './alunos.component';

const alunosRoutes: Routes = [
  {
    path: 'alunos',
    component: AlunosComponent,
    children: [
      { path: 'cadastrar', component: AlunoFormComponent },
      { path: ':id', component: AlunoDetalheComponent },
      { path: ':id/editar', component: AlunoFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(alunosRoutes)],
  exports: [RouterModule],
})
export class AlunosRoutingModule {}