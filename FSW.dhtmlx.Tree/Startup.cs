using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System;

namespace FSW.dhtmlx
{
    public class Startup : Core.StartupBase
    {
        public override void ConfigureMvc(IMvcBuilder mvc)
        {
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        public override void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public override void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            RegisterFiles(new[]
            {
                "wwwroot.lib.dhtmlxTree.dhtmlxtree.js",
                "wwwroot.lib.dhtmlxTree.dhtmlxtree.css",
                "wwwroot.js.dhtmlx.controls.Tree.js",
                "wwwroot.lib.dhtmlxTree.skins.dhtmlxtree_dhx_web.css",
            });
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new EmbeddedFileProvider(typeof(Startup).Assembly, "FSW.dhtmlx.wwwroot")
            });
        }
    }
}
