<template>
    <div class="search-panel">
        <el-row class="m-header-searchbar">
            <el-col class="left" :span="3">
                <img src="//s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="美团">
            </el-col>
            <el-col class="center" :span="15">
                <div class="wrapper">
                    <el-input 
                        v-model="searchWord" 
                        placeholder="搜索商家和地点" 
                        @focus="focus" 
                        @blur="blur"
                        @input="input"
                    ></el-input>
                    <el-button style="padding: 13px 20px" type="primary" icon="el-icon-search"></el-button>
                    <dl class="hotPlace" v-if="isHotPlace">
                        <dt v-if="hotPlaceList.length">热门搜索</dt>
                        <dd 
                            v-for="(item, index) in hotPlaceList"
                            :key="index"
                        >
                            <router-link :to="{name: 'goods', params: {name: item}}">{{ item }}</router-link>
                        </dd>
                    </dl>
                    <dl class="searchList" v-if="isSearchList">
                        <dd 
                            v-for="(item, index) in searchList"
                            :key="index"
                        >
                            <router-link :to="{name: 'goods', params: {name: item}}">{{ item }}</router-link>
                        </dd>
                    </dl>
                </div>
                <p class="suggest">
                    <a href="#"
                        v-for="(item, index) in suggestList"
                        :key="index"
                    >
                        {{ item }}
                    </a>
                </p>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import api from '@/api/index.js'
export default {
    data() {
        return {
            searchWord: '',
            isFocus: false,
            hotPlaceList: [],
            searchList: [],
            suggestList: [],
        }
    },
    created() {
        api.searchHotWord().then(res => {
            this.hotPlaceList = res.data.data;
            this.suggestList = res.data.data;
        })
    },
    computed: {
        isHotPlace: function() {
            return this.isFocus && !this.searchWord;
        },
        isSearchList: function() {
            return this.isFocus && this.searchWord;
        },
    },
    methods: {
        focus() {
            this.isFocus = true;
        },
        blur() {
            let self = this;
            setTimeout(() => {
                self.isFocus = false;
            }, 200);
        },
        input() {
            let val = this.searchWord;
            api.getSearchList().then(res => {
                this.searchList = res.data.data.list.filter((item, index) => {
                    return item.includes(val);
                });
            })
        },
    }
}
</script>
