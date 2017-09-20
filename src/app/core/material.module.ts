import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
	MdToolbarModule,
	MdTableModule,
	MdIconModule,
	MdProgressSpinnerModule,
	MdProgressBarModule,
	MdChipsModule,
} from '@angular/material';

let modules = [
	BrowserAnimationsModule,
	MdToolbarModule,
  MdTableModule,
  MdIconModule,
  MdProgressSpinnerModule,
  MdProgressBarModule,
  MdChipsModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }