<template>
<!-- Navigation 영역 -->
<nav>
  <ul style="height: calc(100% - 100px);">
    <li class="logo-wrapper">
      <div>
        <i class="navbar-brand-icon"></i>
        <span>WatchAll</span>
      </div>
    </li>
    <li class="unread" @click="pageMove('dashboard')">
      <div>
        <i class="fa fa-laptop"></i>
        <span>대시보드</span>
      </div>
    </li>
    <li class="unread active" @click="pageMove('topology')">
      <div>
        <i class="fa fa-laptop"></i>
        <span>토폴로지맵</span>
      </div>
    </li>
    <li class="unread" @click="pageMove('performance')">
      <div>
        <i class="fa fa-laptop"></i>
        <span>성능/운영</span>
      </div>
    </li>
  </ul>
  <ul class="fix-menu" style="height: 100px;">
    <li class="unread active">
      <div>
        <i class="fa fa-laptop"></i>
        <span>Sample 3</span>
      </div>
    </li>
    <li class="unread">
      <div>
        <i class="fa fa-laptop"></i>
        <span>Sample 3</span>
      </div>
    </li>
  </ul>
</nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'WFrameMenu',
  computed: {
    ...mapGetters({
      getTitle: 'getTitle',
      getLinks: 'getLinks',
    }),
  },
  actions: {
    ...mapActions({
      setTitle: 'setTitle',
    }),
  },
  methods: {
    pageMove(param) {
      const self = this;

      const idx = self.getLinks.findIndex((x) => x.key === param);

      self.$store.dispatch('asyncSetTitle', self.getLinks[idx].value);
    },
  },
};
</script>

<style>

</style>
