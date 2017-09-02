import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdToolbarModule } from '@angular/material';

let modules = [
	BrowserAnimationsModule,
	MdToolbarModule,
  // MdTableModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }