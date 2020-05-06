export class View {

    constructor(HTMLElement){
        this._HTMLElement = HTMLElement;
    }

    template(model){
        throw new Error("The method 'template' should be implemented");
    }

    update(model){
        this._HTMLElement.innerHTML = this.template(model);
    }
}