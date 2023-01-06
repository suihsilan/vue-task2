import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      //固定網址
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "sui-vue", //api_path
      products: [], //資料列表變數
      tempProduct: {}, //單筆資料變數
    };
  },
  methods: {
    //驗證方法
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          //調用getData()方法 取的產品清單
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          //錯誤跳轉回登入頁面
          window.location = "login.html";
        });
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data.products);
          //把我在遠端的產品列表資料傳入到this.produts裡
          this.products = response.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openProduct(product) {
      this.tempProduct = product;
    },
  },
  //生命週期，初始化之後，立即調用，最常用的callback fn用來掛載到頁面上
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //將token夾帶在header中axios請求送出給伺服器
    axios.defaults.headers.common["Authorization"] = token;
    //觸法驗證方法
    this.checkAdmin();
  },
}).mount("#app");
