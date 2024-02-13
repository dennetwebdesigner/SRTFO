import { createRouter,createWebHistory } from "vue-router"
import Home from "./page/home/Home.vue"
import PlayingCentral from "@/page/admin/playingCentral/PlayingCentral.vue"
import InitAdmin from "@/page/admin/init/InitAdmin.vue"
const routes = [
  { path: '/', component: Home },
  { path: '/adm', component: InitAdmin },
  { path: '/adm/jogo', component: PlayingCentral },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history:createWebHistory(),
  routes, // short for `routes: routes`
})

export {router}