/// <reference path="..\..\..\..\dt\controls\html\htmlControlBase.d.ts" />

declare var dhtmlXTreeObject;

namespace controls.html.dhtmlx {

    interface treeItem {
        id: number;
        text: string;
        item: treeItem[];
    }

    export class Tree extends controls.html.htmlControlBase {

        get Items(): treeItem[] {
            return this.getPropertyValue<this, treeItem[]>("Items");
        }

        tree: any;

        initialize(type: string, index: number, id: string, properties: { property: string, value: any }[]) {
            super.initialize(type, index, id, properties);
            this.tree = new dhtmlXTreeObject(this.id, "100%", "100%", 0);
            this.tree.setImagesPath("/lib/dhtmlxTree/imgs/dhxtree_web/");


            this.getProperty<this, treeItem[]>("Items").onChangedFromServer.register(this.onItemsChangedFromServer.bind(this));
        }

        onItemsChangedFromServer() {
            this.tree.parse(this.Items, "json");
        }

        protected initializeHtmlElement(): void {
            this.element = $('<div></div>');
            this.appendElementToParent();
        }

    }
}
core.controlTypes['dhtmlx.Tree'] = () => new controls.html.dhtmlx.Tree();