import { Component,HostBinding,ViewEncapsulation, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { OverlayContainer} from '@angular/cdk/overlay';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class AppComponent  implements OnInit {
	 pushRightClass: string = 'push-right';

    constructor(private translate: TranslateService, public router: Router, public overlayContainer: OverlayContainer) {
    	 this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

	isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    ngOnInit() {
        this.changeLang('en');
    }

    @HostBinding('class') componentCssClass;

    onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
    
}
