import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotesService } from './../../Services/notes.service';
import { AuthService } from './../../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  AllNotes: any;
  token;
  decoded
  isLoded = false;
  isClicked = false;
  constructor(private _Router: Router, private _notes: NotesService) {


    //  what if client is put token this will lost every thing in your app 
    // so put decode in try catch
    try {
      this.token = localStorage.getItem('Token');
      this.decoded = jwt_decode(this.token);
    } catch (error) {
        localStorage.clear();
      this._Router.navigate(['/signin']);
    }
    this.getNotes();

    if (!localStorage.getItem('Token')) {
      this._Router.navigate(['/signin']);
    }
  }

  // create instance of addnote form 
  AddNote  = new FormGroup({
    title:new FormControl('',Validators.required),
    desc: new FormControl('', Validators.required)
  })
  // edit note
  EditNote = new FormGroup({
    title: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required)
  })
  
  getNotes(){
    let data = {
      token: this.token,
      userID: this.decoded._id
    }
    this._notes.getTaks(data).subscribe(res => {
      // console.log(res)
      this.isLoded= true
      this.AllNotes = res.Notes

    })
  }
  AddData() {
   this.isClicked = true;
    // create obj to send it to notes services 
    let data = {
      title:this.AddNote.value.title,
      desc:this.AddNote.value.desc,
      token:this.token,
      citizenID : this.decoded._id
    }
    console.log(this.AddNote.value);

    this._notes.addNote(data).subscribe(res=>{
      console.log(res);
      // if the res is message = success 
      // hide model and display new note 

      if(res.message == 'success')
      {
        $('#AddNote').modal('hide');
        this.getNotes();
        this.AddNote.reset();
        this.isClicked = false;
      }
    })
  }
  // delete note 
  NoteID
  getID(id)
  {
    this.NoteID = id;
    console.log(id);
  }
  removeNote()
  {
    let data = {
      token:this.token,
      NoteID : this.NoteID
    }
    this._notes.deleteNote(data).subscribe(res=>{
      console.log(res);
      if (res.message == 'deleted')
      {
        $('#DeleteNote').modal('hide');
        this.getNotes();
      }
    })
  }

  // set value to edit current note 

  setValue() {
    for(let index= 0; index<this.AllNotes.length; index++)
    {
      if(this.AllNotes[index]._id==this.NoteID){
        // console.log(this.AllNotes[index]);
        // console.log(this.AllNotes[index].title);
        // console.log(this.AllNotes[index].desc); //get the id of every not 
         //get the id of every not 
         //get the id of every not 
        // to update every note 
        this.EditNote.controls.title.setValue(this.AllNotes[index].title)
        this.EditNote.controls.desc.setValue(this.AllNotes[index].desc)
        
      }
    }
  }

  updateNote(){
    this.isClicked = true;
      let data = {
        token : this.token,
        NoteID:this.NoteID,
        title:this.EditNote.value.title,
        desc:this.EditNote.value.desc
      }
      this._notes.updateNote(data).subscribe(res=>{
        console.log(res);
        if(res.message == 'updated')
        {
          $('#EditNote').modal('hide');
          this.getNotes();
          this.isClicked = false;
          
        }
      })
  }
  ngOnInit() {
  }

}
