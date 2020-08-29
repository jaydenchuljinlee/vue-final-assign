// vue
import Vue from 'vue';

// vue-router
import Router from 'vue-router';

// 성능 컴포넌트
import WPerformance from '@/views/performance/index';

Vue.use(Router);

const router = new Router({
  routes: [
    {// 성능 페이지 호출
      path: '/',
      name: 'WPerformance',
      component: WPerformance,
    },
  ],
});

export default router;
