import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { AuthService } from 'src/app/Services/auth.service';
declare var $:any
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  isStyleInvalid={'background-color':'#17a2b8','border-color':'#17a2b8'}
  isStyleValid={'background-color':'gray','border-color':'gray'}
  isClicked = false;
  ResponseMessage='';
  isRegistedBefore='';
  isRegisted = false;
  isSucced = false;
  constructor(private _AuthService:AuthService) {
 
    
   }
   signUp=new FormGroup({
    first_name:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    last_name:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    age:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)])
   })

   FormData()
   {
 
  this.isClicked = true;
    if(this.signUp.valid)
    {
      // console.log(this.signUp.value)

      this._AuthService.signUp(this.signUp.value).subscribe(response=>{
         console.log(response)
        if(response.message == 'success')
        {
          this.isClicked = false;
          this.isSucced = true;
          this.isRegisted = false;
          this.ResponseMessage = response.message;
          this.signUp.reset()
        }else{
          this.isRegisted = true;
          this.isRegistedBefore  = response.errors.email.message;
          this.isClicked = false;
          this.isSucced = false;
        }
     
      })

    }
   }

  ngOnInit() {

      $('#signIn').particleground();
  }
}