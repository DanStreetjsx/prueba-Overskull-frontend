import { createRouter, createWebHistory } from 'vue-router'
import CategoriesView from '@/views/CategoriesView.vue'
import ProductsView from '@/views/ProductsView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/products' },
    { path: '/products', name: 'products', component: ProductsView },
    { path: '/categories', name: 'categories', component: CategoriesView },
  ],
})
