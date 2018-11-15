using FSW.dhtmlx;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;

namespace Tests.Pages
{
    public class IndexModel : FSW.Core.FSWPage
    {
        private readonly Tree TestTree = new Tree();

        public override void OnPageLoad()
        {
            base.OnPageLoad();

            TestTree.OnSelectedItemChanged += TestTree_OnSelectedItemChanged;

            TestTree.Items = new List<Tree.Item>()
            {
                new Tree.Item()
                {
                    Id = 1,
                    Text = "Woouhou",
                    Items = new List<Tree.Item>()
                    {
                        new Tree.Item()
                        {
                            Id = 2,
                            Text = "yo yo"
                        },
                        new Tree.Item()
                        {
                            Id = 3,
                            Text = "yo yo 2"
                        },
                        new Tree.Item()
                        {
                            Id = 4,
                            Text = "yo yo 3"
                        }
                    }
                }
            };
        }

        private void TestTree_OnSelectedItemChanged(Tree tree, Tree.Item item)
        {
            
        }
    }
}