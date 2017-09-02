import 'hammerjs';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { HttpModule }    from '@angular/http';

let modules = [
	BrowserModule,
	MaterialModule,
	HttpModule, 
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class CoreModule { }