import { NgModule } from '@angular/core';

// ModuleFiles
import { imports } from './module-file/imports';
import { declarations } from './module-file/declarations';
import { providers } from './module-file/providers';
import { bootstrap } from './module-file/boostrap';

@NgModule({
  declarations: declarations,
  imports: imports,
  providers: providers,
  bootstrap: bootstrap
})
export class AppModule { }
