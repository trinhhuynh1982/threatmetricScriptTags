import { AfterViewInit, Component, Directive, ElementRef, OnInit, Pipe, PipeTransform, Renderer2, VERSION, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(html: any) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
@Directive({ selector: '[runScripts]' })
export class RunScriptsDirective implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }
  ngOnInit(): void {
    // setTimeout(() => { // wait for DOM rendering
    //   this.reinsertScripts();
    // });
  }
  ngAfterViewInit() {
    // debugger
    // wait for DOM rendering
    this.reinsertScripts();
  }
  addJsToElement(src: string, text: string = ''): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    if (src) {
      script.src = src;
    } else {
      script.text = text;
    }
    this.renderer.appendChild(document.body, script);
    return script;
  }
  reinsertScripts(): void {
    debugger
    const scripts = <HTMLScriptElement[]>this.elementRef.nativeElement.getElementsByTagName('script');
    for (let script of scripts) {
      if (script.src) {
        this.addJsToElement(script.src);
      } else
      eval(script.text);
    }
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  // html: string = `<b>script</b> <script type="text/javascript">
  //   console.log('console Trinh !');
  //   alert("Trinh");
  // </script> <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js">`;
  comment: string = `<b>script</b> <script type="text/javascript">
    console.log('console Trinh !');
    alert("Trinh");
  </script> <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js">`;
  @ViewChild('myDiv') divElement!: ElementRef;
  // @ViewChild('htmlContainer') container!: ElementRef;
  onClick() {
    this.divElement.nativeElement.innerHTML = this.comment;
    const scripts = <HTMLScriptElement[]>this.divElement.nativeElement.getElementsByTagName('script');
    for (let script of scripts) {
      if (script.src) {
        this.addJsToElement(script.src);
      } else
      eval(script.text);
    }
  }
  constructor(private renderer: Renderer2, private sanitizer: DomSanitizer, private elementRef: ElementRef) {

  }

  addJsToElement(src: string, text: string = ''): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    if (src) {
      script.src = src;
    } else {
      script.text = text;
    }
    this.renderer.appendChild(document.body, script);
    return script;
  }
  // ngAfterViewInit() {
  //   // wait for DOM rendering
  //   let scripts = this.container.nativeElement.getElementsByTagName('script');
  //   for (let script of scripts){
  //     eval(script.text)
  //   }
  // }

}
