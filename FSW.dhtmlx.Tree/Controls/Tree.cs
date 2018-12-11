using FSW.Utility;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace FSW.dhtmlx
{

    public class Tree : Controls.Html.HtmlControlBase
    {
        public class Item
        {
            [JsonProperty(PropertyName = "id")]
            public int Id;

            [JsonProperty(PropertyName = "text")]
            public string Text;

            [JsonProperty(PropertyName = "open", DefaultValueHandling = DefaultValueHandling.Ignore)]
            public bool Open;

            [JsonProperty(PropertyName = "im0", DefaultValueHandling = DefaultValueHandling.Ignore)]
            public string ImageIfNoChildren;

            [JsonProperty(PropertyName = "im1", DefaultValueHandling = DefaultValueHandling.Ignore)]
            public string ImageIfExpanded;

            [JsonProperty(PropertyName = "im2", DefaultValueHandling = DefaultValueHandling.Ignore)]
            public string ImageIfCollapsed;

            [JsonProperty(PropertyName = "item")]
            public List<Item> Items;

            [JsonIgnore]
            public object Tag;
        }

        public delegate void OnSelectedItemChangedHandler(Tree tree, Item item);
        public event OnSelectedItemChangedHandler OnSelectedItemChanged;

        private ControlPropertyList<Item> Items_ { get; set; }

        public IList<Item> Items
        {
            get => Items_;
            set => Items_.Set(value.ToList());
        }

        public override string ControlType => "dhtmlx.Tree";

        public override void InitializeProperties()
        {
            base.InitializeProperties();

            Items_ = new ControlPropertyList<Item>(this, nameof(Items));
        }

        public Item GetItemById(int id)
        {
            foreach( var item in Items)
            {
                var subItem = GetItemById(id, item);
                if (subItem != null)
                    return subItem;
            }
            return null;
        }
        
        private Item GetItemById(int id, Item start)
        {
            if (start.Id == id)
                return start;
            if (start.Items == null)
                return null;
            foreach (var item in start.Items)
            {
                var subItem = GetItemById(id, item);
                if (subItem != null)
                    return subItem;
            }
            return null;
        }

        [Core.CoreEvent]
        protected void OnSelectedItemChangedFromClient(int id)
        {
            OnSelectedItemChanged?.Invoke(this, GetItemById(id));
        }
    }
}
