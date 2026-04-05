import { Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout/dashboard-layout';
//import { Estadisticas } from './pages/estadisticas/estadisticas';
import { Simulacion } from './pages/simulacion/simulacion';
import { ZombieForm } from './pages/zombies/zombie-form/zombie-form';
import { ZombieList } from './pages/zombies/zombie-list/zombie-list';
import { Ranking } from './pages/ranking/ranking';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', redirectTo: 'simulacion', pathMatch: 'full' },
      { path: 'simulacion', component: Simulacion },
     // { path: 'estadisticas', component: Estadisticas },
      { path: 'ranking', component: Ranking },
      { path: 'zombies', component: ZombieList },
      { path: 'zombies/nuevo', component: ZombieForm },
      { path: 'zombies/editar/:id', component: ZombieForm }
    ]
  },
  {
    path: '**',
    redirectTo: 'simulacion'
  }
];