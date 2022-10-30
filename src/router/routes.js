// * @Author: Ismail Debele Asega
// * @Email: asega03@gmail.com
// * @LinkedIn: https://www.linkedin.com/in/asegaismail/
// * @Github: https://github.com/ismailasega
// * @GitLab: https://gitlab.com/asegaismail
// * @Tel: +256-784-491412 / +256-756-454376


import { createRouter, createWebHistory } from 'vue-router'
import Dashoard from '../views/Dashboard.vue'

const routes = [
    {
        path: '/',
        name: 'Dashoard',
        component: Dashoard
    }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router
