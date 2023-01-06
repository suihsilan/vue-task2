//載入vue esm的cdn
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

//起手式，建立Vue元件
const app = {
  data() {
    //資料(函式)
    return {
      user: {
        //使用者登入的帳密
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      //登入方法,我們會透過v-on:click綁定login方法，在使用者在畫面上點擊登入，觸發login行為
      //登入的api網址
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      //發送登入請求
      axios
        .post(api, this.user) //this會將user的內容展開在Proxy的target物件下，當值改變時，Proxy會去攔截這裡面的值也作出相應的變化(我們透過v-model綁定input-username以及input-password,當使用者在畫面的input中輸入內容，因此也同樣會從這裡傳遞給伺服器去資料庫做比對是否有這個使用者)
        .then((response) => {
          //成功回應
          //需要取的token和expired並且存到cookie中
          const { token, expired } = response.data;
          // 把expired token寫入 cookie
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

          //夾帶token在header中
          //如何夾在token在header中透過axios傳給伺服器
          axios.defaults.headers.common["Authorization"] = token;
          //因為登入請求進入then代表登入成功，會跳轉頁面至產品列表
          window.location = "./products.html";
        })
        .catch((err) => {
          //錯誤，清空欄位，跳出錯誤訊息重新輸入
          this.user.username = "";
          this.user.password = "";
          alert(err.response.data.message);
        });
    },
  },
};
//生成Vue元件的資料，並傳遞到畫面上
createApp(app).mount("#app");
