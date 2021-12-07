import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ValueAccessorComponent} from './value-accessor/value-accessor.component'
import {MatInputModule} from '@angular/material/input';
@NgModule({
  declarations: [ValueAccessorComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  exports:[ValueAccessorComponent]
})
export class ValueAccessorModule { }
