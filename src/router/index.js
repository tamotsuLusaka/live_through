import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import SetList from '@/views/setList/SetList.vue'
import Music from '@/views/setList/Music.vue'
import CreateMusic from '@/views/setList/CreateMusic.vue'
import CreateSetList from '@/views/setList/CreateSetList.vue'
import ShowSetList from '@/views/setList/ShowSetList.vue'
import Complement from '@/views/setList/Complement.vue'
import ExportSetList from '@/views/setList/ExportSetList.vue'
import StagePlot from '@/views/stagePlot/StagePlot.vue'
import CreateStagePlot from '@/views/stagePlot/CreateStagePlot.vue'
import CreateBand from '@/views/stagePlot/CreateBand.vue'
import SelectInstrument from '@/views/stagePlot/SelectInstrument.vue'
import CreateInstrument from '@/views/stagePlot/CreateInstrument.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/sign_up',
    name: 'SignUp',
    component: SignUp,
    props: true
  },
  {
    path: '/sign_in',
    name: 'SignIn',
    component: SignIn,
    props: true
  },
  {
    path: '/set_list',
    name: 'SetList',
    component: SetList,
    props: true
  },
  {
    path: '/music',
    name: 'Music',
    component: Music,
    props: true
  },
  {
    path: '/music/create',
    name: 'CreateMusic',
    component: CreateMusic,
    props: true
  },
  {
    path: '/music/:id/edit',
    name: 'EditMusic',
    component: CreateMusic,
    props: true
  },
  {
    path: '/set_list/create',
    name: 'CreateSetList',
    component: CreateSetList,
    props: true
  },
  {
    path: '/set_list/:id/edit',
    name: 'EditSetList',
    component: CreateSetList,
    props: true
  },
  {
    path: '/set_list/:id',
    name: 'ShowSetList',
    component: ShowSetList,
    props: true
  },
  {
    path: '/set_list/:id/complement',
    name: 'Complement',
    component: Complement,
    props: true
  },
  {
    path: '/set_list/:id/export',
    name: 'ExportSetList',
    component: ExportSetList,
    props: true
  },
  {
    path: '/stage_plot',
    name: 'StagePlot',
    component: StagePlot,
    props: true
  },
  {
    path: '/stage_plot/create',
    name: 'CreateStagePlot',
    component: CreateStagePlot,
    props: true
  },
  {
    path: '/stage_plot/band/:id/edit',
    name: 'EditBand',
    component: CreateBand,
    props: true
  },
  {
    path: '/stage_plot/band/:id/select',
    name: 'SelectInstrument',
    component: SelectInstrument,
    props: true
  },
  {
    path: '/stage_plot/band/:id/instrument/create',
    name: 'CreateInstrument',
    component: CreateInstrument,
    props: true
  },
  {
    path: '/stage_plot/band/:id/instrument/:instrumentId/edit',
    name: 'EditInstrument',
    component: CreateInstrument,
    props: true
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  //リンク後にスクロールをトップに戻す
  scrollBehavior () {
    return document.getElementById('app').scrollIntoView();
  }
})

export default router
