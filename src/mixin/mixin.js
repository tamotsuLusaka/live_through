export default{
  data(){
    return{

    }
  },
  inject: ["mq"], //mq用
  methods:{

    // スクロールを止める箇所に設置。止めるときは引数にtrue、解除の時はfalse
    _stop(fixed){
      
      /**
       * 表示されているスクロールバーとの差分を計測し、背面固定時はその差分body要素に余白を生成する
       */
      const scrollbarWidth = window.innerWidth - document.body.clientWidth;
      document.body.style.paddingRight = fixed ? `${scrollbarWidth}px` : '';
    
      /**
       * スクロール位置を取得する要素を出力する(`html`or`body`)
       */
      const scrollingElement = () => {
        const browser = window.navigator.userAgent.toLowerCase();
        if ('scrollingElement' in document) return document.scrollingElement;
        if (browser.indexOf('webkit') > 0) return document.body;
        return document.documentElement;
      };
    
      /**
       * 変数にスクロール量を格納
       */
      const scrollY = fixed
        ? scrollingElement().scrollTop
        : parseInt(document.body.style.top || '0');
    
      /**
       * CSSで背面を固定
       */
      const styles = {
        height: '100vh',
        left: '0',
        overflow: 'hidden',
        position: 'fixed',
        top: `${scrollY * -1}px`,
        width: '100vw',
      };
    
      Object.keys(styles).forEach((key) => {
        document.body.style[key] = fixed ? styles[key] : '';
      });
    
      /**
       * 背面固定解除時に元の位置にスクロールする
       */
      if (!fixed) window.scrollTo(0, scrollY * -1);
    },
    
    //selectが選ばれたら色を変える。selectタグがcssで初期値の色変えれないから。使わなくなったけど
    // _selectColor(e){
    //   if(e.target.value !== null){
    //     if(!e.target.classList.value.includes('_SELECT-COLOR')){
    //       e.target.classList.toggle('_SELECT-COLOR')
    //     } 
    //   }
    // },

    //トップへスクロール
    _goToTop(){
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    },

    // Objectに中身をそれぞれ空にする
    _clearObject(object){
      Object.keys(object).forEach((key)=>{
        object[key] = null
      })
    },
    
    _generateId(id){
      var date = new Date()
      const year = date.getFullYear()
      const month = 1 + date.getMonth()
      const day = date.getDate()
      const hour = date.getHours()
      const minute = date.getMinutes()
      const second = date.getSeconds()
      const millisecond = date.getMilliseconds()
      
      var format = 'YYYYMMDDhhmmsslll';
      format = format.replace(/YYYY/g, year);
      format = format.replace(/MM/g, month);
      format = format.replace(/DD/g, day);
      format = format.replace(/hh/g, hour);
      format = format.replace(/mm/g, minute);
      format = format.replace(/ss/g, second);
      format = format.replace(/lll/g, millisecond);
      format = Number(format)
      format = format.toString(16)
      return id + format
    },
  },


  mounted(){

  },
  beforeDestory(){

  },

}