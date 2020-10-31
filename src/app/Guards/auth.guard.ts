import { AuthService } from '../Services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private AuthServ:AuthService,private _Router : Router)
  {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // check for services 
      if(this.AuthServ.isLoggedIn())
        {
        return true;
        }else{
        this._Router.navigate(["/signin"]);
        return false;
        }
  }
  
}
