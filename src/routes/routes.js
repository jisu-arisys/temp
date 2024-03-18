import DashboardLayout from '../layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../pages/base/NotFoundPage.vue'

// Admin pages
import Overview from 'src/pages/base/Overview.vue'
import UserProfile from 'src/pages/base/UserProfile.vue'
import TableList from 'src/pages/base/TableList.vue'
import Typography from 'src/pages/base/Typography.vue'
import Icons from 'src/pages/base/Icons.vue'
import Maps from 'src/pages/base/Maps.vue'
import Notifications from 'src/pages/base/Notifications.vue'
import Upgrade from 'src/pages/base/Upgrade.vue'

//new pages
import UserList from 'src/pages/UserList.vue'
import UserUpdate from 'src/pages/UserUpdate.vue'
import CustomerList from 'src/pages/CustomerList.vue'
import CustomerUpdate from 'src/pages/CustomerUpdate.vue'
import GroupUpdate from 'src/pages/GroupUpdate.vue'
import GroupList from 'src/pages/GroupList.vue'
import TimeEditForm from 'src/pages/TimeEditForm.vue'
import HolidaySheduleList from 'src/pages/HolidaySheduleList.vue'
import ToggleGroup from 'src/pages/test.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'togglegroup',
        name: 'ToggleGroup',
        component: ToggleGroup
      },
      {
        path: 'timetditform/:id',
        name: 'TimeEditForm',
        component: TimeEditForm
      },
      {
        path: 'groupupdate/:id',
        name: 'GroupUpdate',
        component: GroupUpdate
      },
      {
        path: 'customerupdate/:id',
        name: 'CustomerUpdate',
        component: CustomerUpdate
      },
      {
        path: 'userupdate/:id',
        name: 'UserUpdate',
        component: UserUpdate
      },
      {
        path: 'grouplist',
        name: 'GroupList',
        component: GroupList
      },
      {
        path: 'holidayshedulelist',
        name: 'HolidaySheduleList',
        component: HolidaySheduleList
      },
      {
        path: 'customerlist',
        name: 'Customerlist',
        component: CustomerList
      },
      {
        path: 'userlist',
        name: 'Userlist',
        component: UserList
      },
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
      {
        path: 'upgrade',
        name: 'Upgrade to PRO',
        component: Upgrade
      }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
