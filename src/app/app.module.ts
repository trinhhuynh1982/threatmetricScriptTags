import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent, RunScriptsDirective, SafeHtmlPipe } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SafeHtmlPipe,
    RunScriptsDirective
  ],
  imports: [
    BrowserModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
