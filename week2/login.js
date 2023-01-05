import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          // 把expired token寫入 cookie
          // expires 設置有效時間
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;

          //夾帶token在header中
          //如何夾在token在header中透過axios傳給伺服器
          axios.defaults.headers.common["Authorization"] = token;
          //跳轉頁面
          window.location = "products.html";
        })
        .catch((err) => {
          this.user.username = "";
          this.user.password = "";
          alert(err.response.data.message);
        });
    },
  },
};

createApp(app).mount("#app");
