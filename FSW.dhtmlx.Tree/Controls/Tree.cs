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

            [JsonProperty(PropertyName = "item")]
            public List<Item> Items;
        }

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
    }
}
