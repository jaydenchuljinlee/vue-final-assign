<template>
  <el-container class="portal-wrapper">
    <w-frame-menu/>
    <div class="portal-main-wrapper">
      <w-frame-header/>
      <w-frame-section/>
    </div>
  </el-container>
</template>

<script>
import WFrameHeader from './components/FrameHeader';
import WFrameMenu from './components/FrameMenu';
import WFrameSection from './components/FrameSection';

export default {
  name: 'WAppFrame',
  components: {
    WFrameHeader,
    WFrameMenu,
    WFrameSection,
  },
};
</script>

<style>

</style>
