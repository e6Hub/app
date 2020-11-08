<template>
  <div
    id="titlebar"
    class="bg-gray-900 text-right"
    :class="{
      'h-6': currentStyle === 'small',
      'h-8': currentStyle === 'win10'
    }"
  >
    <div id="window-buttons" class="inline-block">
      <titlebar-button id="minimize-app" :imgSrc="MinIcon"/>
      <titlebar-button id="restore-app" :imgSrc="RestoreIcon" v-if="isMaximized"/>
      <titlebar-button id="maximize-app" :imgSrc="MaxIcon" v-else/>
      <titlebar-button id="close-app" :imgSrc="CloseIcon" role="danger"/>
    </div>
  </div>
</template>

<script>
import CloseIcon from "@/assets/titlebar/c.png";
import MaxIcon from "@/assets/titlebar/m.png";
import RestoreIcon from "@/assets/titlebar/r.png";
import MinIcon from "@/assets/titlebar/n.png";
import titlebarButton from "@/components/TitlebarButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "Titlebar",
  data() {
    return {
      MinIcon,
      RestoreIcon,
      MaxIcon,
      CloseIcon,
      isMaximized: false,
    };
  },
  computed: {
    ...mapGetters(["setting"]),
    currentStyle() {
      return this.setting("titlebarStyle");
    }
  },
  components: { titlebarButton },
  mounted() {
    this.$nextTick(() => {
      const { BrowserWindow } = require("electron").remote,
        selfWin = BrowserWindow.getAllWindows()[0],
        self = this;

      this.isMaximized = selfWin.isMaximized();

      selfWin.on("unmaximize", () => this.isMaximized = false );
      selfWin.on("maximize", () => this.isMaximized = true );

      document.getElementById("close-app").onclick = () => { selfWin.close() };
      document.getElementById("maximize-app").onclick = () => { selfWin.isMaximized() ? selfWin.restore() : selfWin.maximize() };
      document.getElementById("minimize-app").onclick = () => { selfWin.minimize() };
    });
  },
};
</script>