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
                initialize(type, index, id, properties) {
                    super.initialize(type, index, id, properties);
                    this.tree = new dhtmlXTreeObject(this.id, "100%", "100%", 0);
                    this.tree.setImagesPath("/lib/dhtmlxTree/imgs/dhxtree_web/");
                    this.tree.attachEvent("onSelect", this.onSelectedItemChanged.bind(this));
                    this.getProperty("Items").onChangedFromServer.register(this.onItemsChangedFromServer.bind(this), true);
                }
                onSelectedItemChanged(id) {
                    this.customControlEvent('OnSelectedItemChangedFromClient', { id: id });
                }
                onItemsChangedFromServer() {
                    this.tree.parse({ id: 0, item: this.Items }, "json");
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