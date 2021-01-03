<!-- pages/index.vue -->
<template>
  <section class="container">
    <h1>Todoリスト</h1>
    <div class="addArea">
      <input type="text" name="addName" v-model="content" placeholder="タスクを入力してください">
      <!-- ①v-on:clickにより、クリックされた場合methodにあるinsertメソッドが呼び出される -->
      <button class="button button--green" @click="insert">追加</button>
    </div>
    <div class="Filter">
      <!-- ①v-on:clickにより、クリックされた場合methodにあるfindメソッドが呼び出される -->
      <!-- v-bindにより、クラスを動的に変えることができる。ここでは、is-activeがフィルタされているか、find_statusにフィルタ条件を設定-->
      <button class="button button--gray" v-bind:class="{'is-active':(!find_flg)}" @click="flag_reset">全て</button>
      <button class="button button--gray" v-bind:class="{'is-active': find_flg && (find_status == '作業前')}" @click="find('作業前')">作業前</button>
      <button class="button button--gray" v-bind:class="{'is-active': find_flg && (find_status == '作業中')}" @click="find('作業中')">作業中</button>
      <button class="button button--gray" v-bind:class="{'is-active': find_flg && (find_status == '完了')}" @click="find('完了')">完了</button>
    </div>
    <table class="Lists">
      <thead>
        <tr>
          <th>タスク</th>
          <th>登録日時</th>
          <th>状態</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        <!-- pages/index.vue -->
        <tr v-for="(item, index) in display_todos" :key="index">
          <td>{{ item.content }}</td>
          <td>{{ item.created }}</td>
          <td>
            <button class="button" v-bind:class="{
              'butto--yet':item.status == '作業前',
              'butto--progress':item.status == '作業中',
              'butto--done':item.status == '完了'}"
              @click="changeStatus(item)">
              {{item.state}}
            </button>
          </td>
          <!-- v-on:clickにより、クリックされた場合methodにあるinsertメソッドが呼び出される -->
          <td><button class="button button--red" @click="remove(item)">削除</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
<script>
import {mapState} from 'vuex';

export default {
  // v-model="content"の初期値の$store.contentの値の設定
  data: function() {
    return {
      content:'',
      find_status: '',
      find_flg: false
    }
  },
  // vuexからmapStateをインポートし、dataにストアのstateの中身を入れ、computedでtodosの中身が変わるたびに描写させるようにしている
  computed: {
    ...mapState(['todos']),
    display_todos: function(){
      if(this.find_flg){
        let arr = [];
        let data = this.todos;
        data.forEach(element => {
          if(element.state == this.find_status){
            arr.push(element);
          }
        });
        return arr;
      }else{
        return this.todos;
      }
    }
  },
  methods: {
    insert: function(){
      if(this.content != ''){
          // storeのmutationsのinsertに、引数として入力されたタスクを渡して実行
          this.$store.commit('insert', {content: this.content});
          // 実行後にテキストボックスの中身を空にする
          this.content = '';
      }
    },
    remove: function(todo){
      this.$store.commit('remove', todo)
    },
    changeStatus: function(todo){
      this.$store.commit('changeStatus', todo)
    },
    // vueの属性をする
    find: function(findState){
      this.find_status = findState;
      this.find_flg = true;
    },
    flag_reset: function(){
      this.find_flg = false;
    }

  }
}
</script>
<style>
/* 省略 */
</style>