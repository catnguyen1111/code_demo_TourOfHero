import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Hero } from '../model/hero';
import { HeroService } from '../Services/hero.service';
import { HeroState } from '../Store/hero.state';
import {Location} from '@angular/common';
import { ControlValueAccessor,NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceStringArray } from '@angular/cdk/coercion';
@Component({
  selector: 'app-value-accessor',
  templateUrl: './value-accessor.component.html',
  styleUrls: ['./value-accessor.component.scss'],
  providers:[{
    provide:NG_VALUE_ACCESSOR,
    useExisting: forwardRef(()=>ValueAccessorComponent),
    multi:true
  }]
})
export class ValueAccessorComponent implements OnInit,ControlValueAccessor {

  val = "" ;
  onChange:any = () =>{};
  onTouch:any = () =>{};
  @Select(HeroState.selectedHero) dataHero1$ !: Observable<Hero>;

  constructor(
    private heroService: HeroService,
    private router:ActivatedRoute,
    private location: Location,
    private store: Store,

  ) { }
  ngOnInit(): void {

  }
  writeValue(val: any): void {
    this.val = val;
    // this.onChange(this.val)
    // this.onTouch(this.val)
    console.log("obj", this.val);
  }
  registerOnChange(fn: any): void {
   this.onChange = fn;
    console.log("registerOnChange",this.onChange);
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
    console.log("registerOnTouched",this.onTouch);
  }
  setDisabledState(isDisabled: boolean) {
  }



}
