// store/index.js
import Vuex from 'vuex';

const createStore = () => {
  return new Vuex.Store({
    // すべてのページで利用するデータをstateにまとめて管理
    state: () => ({
      todos: [
        {content: 'テスト', created: '2020-04-30 17:00', state: '作業前'}, 
        {content: 'コーディング', created: '2020-04-30 16:00', state: '作業中'},
        {content: '環境構築', created: '2020-04-30 15:30', state: '完了'}
      ],
      options: [
          {id: 0, label: '作業前'},
          {id: 1, label: '作業中'},
          {id: 2, label: '完了'}
      ]
    }),
    // mutationsは「変化」という意味。つまり、stateに対して値をセットできる
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
        },
        remove: function(state, obj){
            for (let i = 0; i < state.todos.length; i++){
                const removeObj = state.todos[i];
                if(obj.content == removeObj.content && obj.created == removeObj.created){
                    if(confirm('"' + removeObj.content + '"を削除していいですか？')){
                        state.todos.splice(i, 1);
                        return;
                    }
                }
            }
        },
        changeStatus: function(state, obj){
            for (let i = 0; i < state.todos.length; i++){
                const changeStatusObj = state.todos[i];
                if(obj.content == changeStatusObj.content && obj.created == changeStatusObj.created){
                    let todoStatus;
                    for (let j = 0; j < state.options.length; j++){
                        if(state.options[j].label == changeStatusObj.state){
                            todoStatus = state.options[j].id;
                        }
                    }
                    todoStatus = todoStatus + 1;
                    if(todoStatus >= state.options.length){
                        todoStatus = 0;
                    }
                    changeStatusObj.state = state.options[todoStatus].label;
                    return;
                }
            }
        }
    }
  })
}

export default createStore;