import { Routes } from '@angular/router';
import { Home } from './screens/home/home';
import { ExamComponent } from './screens/exam/exam';
import { LoginAdmin } from './screens/admin/login-admin/login-admin';
import { AdminHome } from './screens/admin/admin-home/admin-home';
import { guestGuard } from './core/guards/guest-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'exam/:idTentativa', component: ExamComponent },
  { path: 'login', component: LoginAdmin, canActivate: [guestGuard] },
  { path: 'admin', component: AdminHome, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' },
];
