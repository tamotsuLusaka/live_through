import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import SignIn from '@/views/SignIn.vue'
import SetList from '@/views/setList/SetList.vue'
import Music from '@/views/setList/Music.vue'
import CreateMusic from '@/views/setList/CreateMusic.vue'
import CreateSetList from '@/views/setList/CreateSetList.vue'
import ShowSetList from '@/views/setList/ShowSetList.vue'
import TruckNumber from '@/views/setList/TruckNumber.vue'
import Complement from '@/views/setList/Complement.vue'
import ExportSetList from '@/views/setList/ExportSetList.vue'
import StagePlot from '@/views/stagePlot/StagePlot.vue'
import CreateStagePlot from '@/views/stagePlot/CreateStagePlot.vue'
import CreateBand from '@/views/stagePlot/CreateBand.vue'
import SelectInstrument from '@/views/stagePlot/SelectInstrument.vue'
import CreateInstrument from '@/views/stagePlot/CreateInstrument.vue'
import EditPosition from '@/views/stagePlot/EditPosition.vue'
import ShowBand from '@/views/stagePlot/ShowBand.vue'
import ExportBand from '@/views/stagePlot/ExportBand.vue'
import CreateIdol from '@/views/stagePlot/CreateIdol.vue'
import AddIdolMember from '@/views/stagePlot/AddIdolMember.vue'
import ShowIdol from '@/views/stagePlot/ShowIdol.vue'
import ExportIdol from '@/views/stagePlot/ExportIdol.vue'
import Setting from '@/views/setting/Setting.vue'
import EditUser from '@/views/setting/EditUser.vue'
import Policy from '@/views/Policy.vue'
import Rule from '@/views/Rule.vue'
import Manager from '@/views/Manager.vue'

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
    path: '/set_list/:id/truck_number',
    name: 'TruckNumber',
    component: TruckNumber,
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
  {
    path: '/stage_plot/band/:id/instrument/edit-position',
    name: 'EditPosition',
    component: EditPosition,
    props: true
  },
  {
    path: '/stage_plot/band/:id',
    name: 'ShowBand',
    component: ShowBand,
    props: true
  },
  {
    path: '/stage_plot/band/:id/export',
    name: 'ExportBand',
    component: ExportBand,
    props: true
  },
  {
    path: '/stage_plot/idol/:id/edit',
    name: 'EditIdol',
    component: CreateIdol,
    props: true
  },
  {
    path: '/stage_plot/idol/member',
    name: 'AddIdolMember',
    component: AddIdolMember,
    props: true
  },
  {
    path: '/stage_plot/idol/member/:memberId',
    name: 'EditIdolMember',
    component: AddIdolMember,
    props: true
  },
  {
    path: '/stage_plot/idol/:id',
    name: 'ShowIdol',
    component: ShowIdol,
    props: true
  },
  {
    path: '/stage_plot/idol/:id/export',
    name: 'ExportIdol',
    component: ExportIdol,
    props: true
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    props: true
  },
  {
    path: '/setting/user',
    name: 'EditUser',
    component: EditUser,
    props: true
  },
  {
    path: '/policy',
    name: 'Policy',
    component: Policy,
    props: true
  },
  {
    path: '/rule',
    name: 'Rule',
    component: Rule,
    props: true
  },
  {
    path: '/manager',
    name: 'Manager',
    component: Manager,
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
