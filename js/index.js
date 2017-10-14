require.config({
    paths: {
        'unpkg': 'https://unpkg.com',
        'cc':    '/ccRPG'
    }
});


(function(){
    document.body.insertAdjacentHTML('afterBegin', '<div id="app"></div>');
    
    var App = {
        Calender:{
            month: 0,
            display: "",
        },
        CaoCao:{
            remain: 100,
        },
    };
    
    var Function = {
            nextMonth(){
                var app = require('App');
                App.Calender.month    += 1;
                App.Calender.display = `${~~(App.Calender.month / 12) + 220}年 ${App.Calender.month % 12 + 1} 月`
            }
     };
    
    App.Function = Function;
    
    define( ['App'], _ => window.app = new Vue({data: App}) );
    
    var template = `<el-input v-model='App.Calender.display' icon='search' icon-click='App.Function.nextMonth()'></el-input>`;
    require(['unpkg/vue/dist/vue', 'unpkg/element-ui/lib/index'], (Vue, ElementUI) => {
        Vue.use(ElementUI);
        Vue.use({
            install: function(Vue){
                Object.defineProperty(Vue.prototype, "App", _ => window.app);
            }
        });
        new Vue({
           el: "#app",
           template: template,
        });
    });
    
})();
