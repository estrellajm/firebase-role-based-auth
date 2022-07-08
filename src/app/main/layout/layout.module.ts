import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './header/header.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './footer/footer.module';

const layout = [
  HeaderModule,
  SidebarModule,
  FooterModule
]

@NgModule({
  declarations: [],
  imports: [CommonModule, ...layout],
  exports: [...layout]
})
export class LayoutModule { }
