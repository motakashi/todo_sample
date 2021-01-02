// store/index.js
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      todos: [
        {content: 'テスト', created: '2020-04-30 17:00', state: '作業前'}, 
        {content: 'コーディング', created: '2020-04-30 16:00', state: '作業中'},
        {content: '環境構築', created: '2020-04-30 15:30', state: '完了'}
      ]
    }),
    mutations:{
        insert: function(state, obj){
            let createDate = new Date();
            let formatCreateDate = createDate.getFullYear()
                                + '-' + ('00' + (createDate.getMonth() + 1)).slice(-2)
                                + '-' + ('00' + createDate.getDate()).slice(-2)
                                + ' ' + ('00' + createDate.getHours()).slice(-2)
                                + ':' + ('00' + createDate.getMinutes()).slice(-2);
            state.todos.unshift({
                content: obj.content,
                created: formatCreateDate,
                state: '作業前'
            })
        }
    }
  })
}

export default createStore;