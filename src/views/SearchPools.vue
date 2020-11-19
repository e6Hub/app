<template>
  <div id="search-container" class="inline-block flex-wrap w-full p-6">
    <h2 class="text-2xl font-bold uppercase text-dark-2 select-none">Search pools</h2>
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
              Search
            </button>
          </div>
        </form>
      </div>
      <div
        id="pools-empty"
        class="text-center py-8 text-gray-4"
        v-if="!pools.length"
      >
        <span v-if="fetching">Loading...</span>
        <span v-else>No pools to see here...</span>
      </div>
      <ul
        id="search-list"
        ref="pools_container"
        class="flex flex-wrap justify-center p-2 w-full h-24 overflow-y-auto flex-1"
      >
        <li
          v-for="(pool, index) in pools"
          v-bind:key="index"
          class="mb-4 w-full cursor-pointer hover:opacity-75 duration-200"
          @contextmenu="listPool(pool)"
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
          <span>No more pools here</span>
        </div>
      </ul>
      <div
        id="search-notfound"
        class="text-center py-8 text-gray-6"
        v-if="noPools"
      >
        <span>Oh? no pools that matches with your filters</span>
      </div>
    </div>
  </div>
</template>

<script>
import PoolItem from "@/components/PoolItem.vue";
import eLink from "@/components/ExternalLink.vue";
import * as _ from "request-promise-native";
import { version as appVer } from "../../package.json";
import { mapGetters, mapActions } from "vuex";

export default {
  replace: false,
  components: { PoolItem, eLink },
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
    ...mapGetters("search", ["poolName"])
  },
  methods: {
    ...mapActions("search", ["setPoolName"]),
    inputPoolName(e) {
      this.setPoolName(e.target.value);
    },
    searchPools(e, cont = false) {
      if (!cont) this.pools = [];
      if (!cont) this.page = 1;
      this.errors = [];
      this.fetching = true;
      this.noPools = false;
      this.lastPage = false;

      _({
        uri: "https://e621.net/pools.json",
        qs: {
          name: this.poolName,
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
      console.log(poolsData);
      poolsData.forEach((pool) => {
        this.pools.push(pool);
      });
      localStorage.pools = JSON.stringify(this.pools);

      document.getElementById("search-list").addEventListener("scroll", (e) => {
        if (this.lastPage) return;
        let el = e.target;
        let lmt = el.scrollHeight - el.offsetHeight;
        let scrl = el.scrollTop;
        if (scrl > lmt - 150 && !this.fetching) {
          ++this.page;
          this.searchPools(null, true);
        }
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
    listPool(pool) {
      let indx = this.$parent.poolsList.findIndex((p) => p.id == pool.id);
      if (indx > -1) this.$parent.poolsList.splice(indx, 1);
      else this.$parent.poolsList.push(pool);
    },
  }
};
</script>