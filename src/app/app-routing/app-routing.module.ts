import { AppMasterPageComponent } from '../app-master-page/app-master-page.component';
import { CharacterListComponent } from '../character-list/character-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AuthGuard } from '../core/auth.guard';
import { RegisterComponent } from '../register/register.component';
import { AccountRecoveryComponent} from '../account-recovery/account-recovery.component';
import { EditUserAccountComponent } from '../edit-user-account/edit-user-account.component';

// fill in with { path: 'pathname', component: ComponentName } when adding routes.
const routes: Routes = [
  { path: 'app', component: AppMasterPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: UserProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'accountRecover', component: AccountRecoveryComponent },
  { path: 'editAccount', component: EditUserAccountComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
