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
        get OnItemOpenedOrClosed(): boolean {
            return this.tryGetPropertyValue<this, boolean>("OnItemOpenedOrClosed");
        }

        tree: any;

        initialize(type: string, index: number, id: string, properties: { property: string, value: any }[]) {
            super.initialize(type, index, id, properties);
            this.tree = new dhtmlXTreeObject(this.id, "100%", "100%", 0);
            this.tree.setImagesPath("/lib/dhtmlxTree/imgs/dhxtree_web/");
            this.tree.attachEvent("onSelect", this.onSelectedItemChanged.bind(this));
            this.tree.attachEvent("onOpenEnd", this.onItemOpenedOrClosed.bind(this));

            this.getProperty<this, treeItem[]>("Items").onChangedFromServer.register(this.onItemsChangedFromServer.bind(this), true);
        }

        onSelectedItemChanged(id: number) {
            this.customControlEvent('OnSelectedItemChangedFromClient', { id: id });
        }

        isLoaded: boolean;
        onItemsChangedFromServer() {
            if (this.isLoaded)
                this.tree.deleteChildItems(0); // 0 == id of the first item ( isn't visible )
            this.tree.parse({ id: 0, item: this.Items }, "json");
            this.isLoaded = true;
        }
        onItemOpenedOrClosed(id, state) {
            if (state == 0 || !this.OnItemOpenedOrClosed)
                return;
            this.customControlEvent('OnItemOpenedOrClosedFromClient', {
                id: id,
                state: state != -1
            });
        }

        protected initializeHtmlElement(): void {
            this.element = $('<div></div>');
            this.appendElementToParent();
        }

    }
}
core.controlTypes['dhtmlx.Tree'] = () => new controls.html.dhtmlx.Tree();