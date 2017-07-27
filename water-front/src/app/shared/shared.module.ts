import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';

// import { BootstrapModalModule } from 'ng2-bootstrap-modal';
// import { BootstrapModalConfirm } from './components/bootstrap-modal/bootstrap-modal-confirm.component';
import { TruncatePipe } from './pipes/truncate';
import { FindKeyPipe } from './pipes/find-key';
import { BootstrapTableComponent } from './bootstrap-table/bootstrap-table.component';



import { MaskDirective } from './directives/mask.directive';
import { MoneyDirective } from './directives/money.directive';

@NgModule( {
    imports: [ RouterModule, CommonModule, FooterModule],
    declarations: [TruncatePipe, FindKeyPipe, BootstrapTableComponent, MaskDirective, MoneyDirective],
    providers: [],
    exports: [TruncatePipe, BootstrapTableComponent, MaskDirective, MoneyDirective]
} )

export class SharedModule { }