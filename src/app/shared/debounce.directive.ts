import { HostListener, EventEmitter, OnInit, Output, Directive } from "@angular/core";
import { debounceTime, Subject } from "rxjs";

@Directive({
    selector: '[debounce]'
})
export class DebounceDirective implements OnInit {

    @Output() inputChange = new EventEmitter();
    private input$ = new Subject();
    ngOnInit() {
            this.input$.pipe(
                debounceTime(500)
            ).subscribe(
                res => this.inputChange.emit(res)
            );
    }
    @HostListener('input' , ['$event']) inputEvent(event: any) {
        event.preventDefault();
        event.stopPropagation();
        this.input$.next(event);   
    }
}