<template>
<el-header class="main-header">
  <el-row class="nav-wrapper" type="flex" justify="space-between">
    <h1>{{ getTitle }}</h1>
    <div class="state-wrapper">
      <el-badge :value="12" class="item">
        <el-button round class="text-round" style="display: block; padding-left: 15px;">장애알림</el-button>
      </el-badge>
      <el-button class="text-round" style="margin-left: 10px;" round size="mini">
        <i class="el-icon-circle-check" style="margin-right: 4px; color: #11b2e2;"></i> AM 수집상태 정상
      </el-button>
      <el-button class="text-round" style="background-color: #eee;" round size="mini">화면 설정</el-button>
      <el-button class="icon-round" round icon="el-icon-star-on" size="mini"></el-button>
      <el-button class="icon-round" round icon="el-icon-search" size="mini"></el-button>
      <el-button class="icon-round" round icon="el-icon-picture" size="mini" style="background-color: #eee"></el-button>
    </div>
  </el-row>
</el-header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WFrameHeader',
  computed: {
    ...mapGetters({
      getTitle: 'getTitle',
    }),
  },
};
</script>

<style>

</style>
