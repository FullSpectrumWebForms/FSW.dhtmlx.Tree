/// <reference path="..\..\..\..\dt\controls\html\htmlControlBase.d.ts" />
var controls;
(function (controls) {
    var html;
    (function (html) {
        var dhtmlx;
        (function (dhtmlx) {
            class Tree extends controls.html.htmlControlBase {
                get Items() {
                    return this.getPropertyValue("Items");
                }
                get OnItemOpenedOrClosed() {
                    return this.tryGetPropertyValue("OnItemOpenedOrClosed");
                }
                initialize(type, index, id, properties) {
                    super.initialize(type, index, id, properties);
                    this.tree = new dhtmlXTreeObject(this.id, "100%", "100%", 0);
                    this.tree.setImagesPath("/lib/dhtmlxTree/imgs/dhxtree_web/");
                    this.tree.attachEvent("onSelect", this.onSelectedItemChanged.bind(this));
                    this.tree.attachEvent("onOpenEnd", this.onItemOpenedOrClosed.bind(this));
                    this.getProperty("Items").onChangedFromServer.register(this.onItemsChangedFromServer.bind(this), true);
                }
                onSelectedItemChanged(id) {
                    this.customControlEvent('OnSelectedItemChangedFromClient', { id: id });
                }
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
                initializeHtmlElement() {
                    this.element = $('<div></div>');
                    this.appendElementToParent();
                }
            }
            dhtmlx.Tree = Tree;
        })(dhtmlx = html.dhtmlx || (html.dhtmlx = {}));
    })(html = controls.html || (controls.html = {}));
})(controls || (controls = {}));
core.controlTypes['dhtmlx.Tree'] = () => new controls.html.dhtmlx.Tree();
//# sourceMappingURL=Tree.js.map