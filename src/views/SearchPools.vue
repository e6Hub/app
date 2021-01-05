<template>
  <div id="search-container" class="inline-block flex-wrap w-full p-6">
    <h2 class="text-2xl font-bold uppercase text-dark-2 select-none" v-text="$t('search.pools.search')"/>
    <div id="search-panels" class="flex flex-warp flex-col h-full">
      <div id="search-opts" class="border-b border-dark-7 w-full py-2 mb-2">
        <form action="#" @submit="searchPools">
          <div v-if="errors.length">
            <ul>
              <li v-for="(err, index) in errors" :key="index">
                <div
                  class="bg-red-8 text-white px-4 py-3 rounded relative mb-4"
                >
                  <span class="block sm:inline">{{ err }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div
            id="e6h__inputsearch"
            class="flex items-center"
          >
            <input
              :value="poolName"
              @input="inputPoolName"
              type="text"
              name="name"
              id="search-name"
              class="rounded mr-2 px-2 py-1 bg-dark-6 focus:bg-dark-5 outline-none focus:outline-none duration-200 text-base"
            />
            <button
              type="submit"
              id="search-pools-btn"
              class="inline-flex items-center bg-blue-6 hover:bg-blue-7 py-1 px-3 rounded duration-200"
            >
              <feather type="search" size="16" class="mr-2" />
              <span v-text="$t('search.submit')"/>
            </button>
          </div>
        </form>
      </div>
      <div
        id="pools-empty"
        class="text-center py-8 text-gray-4"
        v-if="!pools.length"
      >
        <span v-if="fetching" v-text="$t('search.loading')"/>
        <span v-else v-text="$t('search.pools.noFetching')"/>
      </div>
      <ul
        id="search-list"
        ref="pools_container"
        class="flex flex-wrap justify-center p-2 w-full overflow-y-auto items-start"
      >
        <li
          v-for="(pool, index) in pools"
          v-bind:key="index"
          class="mb-4 w-full cursor-pointer hover:opacity-75 duration-200"
          @click="viewPool(pool.id)"
        >
          <PoolItem
            :pool="pool"
          />
        </li>
        <div
          id="search-nomore"
          class="text-center py-8 text-gray-6 w-full"
          v-if="lastPage"
        >
          <span v-text="$t('search.pools.lastPage')"/>
        </div>
      </ul>
      <div
        id="search-notfound"
        class="text-center py-8 text-gray-6"
        v-if="noPools"
      >
        <span v-text="$t('search.pools.nothingHere')"/>
      </div>
    </div>
  </div>
</template>

<script>
import PoolItem from "@/components/PoolItem.vue";
import * as _ from "request-promise-native";
import { version as appVer } from "../../package.json";
import { mapGetters, mapActions } from "vuex";

export default {
  replace: false,
  components: { PoolItem },
  data() {
    return {
      pools: [],
      errors: [],
      fetching: false,
      page: 1,
      lastPage: false,
      noPools: false,
    };
  },
  computed: {
    ...mapGetters("search", ["poolName"]),
    ...mapGetters("settings", ["setting"]),
    searchMode() {
      return this.setting("searchMode");
    },
  },
  methods: {
    ...mapActions("search", ["setPoolName"]),
    inputPoolName(e) {
      this.setPoolName(e.target.value);
    },
    searchPools(e, cont = false) {
      if (!cont) {
        this.pools = [];
        this.page = 1;
      } else ++this.page;

      this.errors = [];
      this.fetching = true;
      this.noPools = false;
      this.lastPage = false;

      _({
        uri: `https://e${this.searchMode}.net/pools.json`,
        qs: {
          'search[name_matches]': this.poolName,
          limit: 60,
          page: this.page,
        },
        headers: {
          "User-Agent": `e6Hub/${appVer} (by AerysSaektide on e621)`,
        },
        json: true,
      })
        .then((d) => {
          if (!this.pools.length && !d.length) this.noPools = true;
          else if (this.pools.length && d.length < 60) this.lastPage = true;
          this.displayPools(d);
        })
        .catch((err) => {
          this.errors.push(
            "An unexpected error ocurred! Check the Dev Console"
          );
          console.warn(err);
          this.fetching = false;
        });

      if (e) e.preventDefault();
    },
    displayPools(poolsData) {
      this.fetching = false;
      if (!poolsData.length) return;
      poolsData.forEach((pool) => {
        this.pools.push(pool);
      });
      localStorage.pools = JSON.stringify(this.pools);

      document.getElementById("search-list").addEventListener("scroll", (e) => {
        if (this.lastPage) return;
        const el = e.target,
          lmt = el.scrollHeight - el.offsetHeight,
          scrl = el.scrollTop;
        if (scrl > lmt - 150 && !this.fetching) this.searchPools(null, true);
      });
    },
    viewPool(poolid) {
      let thisPool = JSON.parse(localStorage.pools).find(
        (pool_id) => pool_id.id == poolid
      );
      if (!thisPool) return;
      this.$router.push({
        name: "poolView",
        params: { pool: thisPool, id: thisPool.id },
      });
    },
  }
};
</script>