require.config({
    paths: {
        'unpkg': 'https://unpkg.com',
        'cc':    '/ccRPG',
        'vue': 'https://unpkg.com/vue/dist/vue',
        'element-ui': 'https://unpkg.com/element-ui',
    }
});


(function(){
    document.body.insertAdjacentHTML('afterBegin', '<div id="app"></div>');
    
    document.body.appendChild(Object.assign(document.createElement("link"),
    { href: "https://unpkg.com/element-ui@1.4.0/lib/theme-default/index.css",
      rel: 'stylesheet', 
      type: 'text/css'}
    ));

    var App = {
        Calender:{
            month: -1,
            display: "",
            gold: 0,
        },
        CaoCao:{
            remain: 100,
            total: 0,
            die_at: '',
            die_rate: 1,
            regen_rate: 0,
        },
        HuaTuo:{
            time: 0,
            timeMax: 1000,
            exp: 0,
            
        },
    };
    

    var Function = {
            formatDate(month){
                return ` ${~~(month / 12) + 220} 年 ${month % 12 + 1} 月`;
            },
            nextMonth(){
                var App = window.app;
                App.Calender.month    += 1;
                if(App.Calender.month && App.Calender.month % 12 == 0){
                    App.CaoCao.die_rate *= 2;
                }
                App.CaoCao.remain     -= App.CaoCao.die_rate;
                if(App.CaoCao.remain < 0){
                    App.$alert(`太医大人，您的曹操死在了${App.Calender.display}`).then(_ => window.location.reload());
                }
                App.Calender.display = this.formatDate(App.Calender.month)
                App.CaoCao.die_at = this.formatDate(App.Calender.month + App.CaoCao.remain);
                App.CaoCao.remain     += App.CaoCao.regen_rate;
                App.HuaTuo.time = App.HuaTuo.timeMax;
            },
            nextMonthProcess(){
                var App = window.app;
                App.CaoCao.remain += 1;
                App.CaoCao.total += 1;
                
                this.nextMonth();
            },

            
     };
    
    App.Function = Function;
    
    define( 'App', _ => function(){return window.app} );
    
    var template = `
<el-row>
<el-col :span='6'>
<el-card>
<span slot='header'>主要<el-button style='float: right;' type='primary' @click='App.Function.nextMonthProcess()' size='small'>续命</el-button></span>
当前:<br>
<el-input readonly v-model='App.Calender.display'><span slot='append' style='color: #FF5A5F;' v-text='App.CaoCao.die_at'></span></el-input>
<div style='height: 15px;'>&nbsp;</div>
曹操剩余寿命
<el-input readonly v-model='App.CaoCao.remain'><span slot='prepend' v-if='App.CaoCao.regen_rate'>再生速率 {{App.CaoCao.regen_rate}}/mo</span><el-button @click='App.Function.nextMonthProcess()' type='primary' slot='append'>续命</el-button></el-input>
<div style='height: 15px;'>&nbsp;</div>
资金
<el-input readonly v-model='App.Calender.gold'></el-input>

</el-card>
<el-card>
<span slot='header'>医馆</span>
  
</el-card>
</el-col>

</el-row>
`;
    require(['vue', 'element-ui/lib/index'], (Vue) => {        
        require(["ELEMENT"], e => {
            Vue.use(e);
            window.app = new Vue({data: App});

            Vue.use({
                install: function(Vue){
                    Object.defineProperty(Vue.prototype, "App", {get: _ => window.app});
                }
            });
            
            new Vue({
                el: "#app",
                template: template,
            });
            App.Function.nextMonth();
        });
    });
    
})();
