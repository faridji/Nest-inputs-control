import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentHierarchyRecursiveComponent } from './department-hierarchy-recursive/department-hierarchy.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentHierarchyRecursiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
