import React from 'react'
class TodoForm extends React.Component {
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log(e);
        // this.setAxiosHeaders();
        // axios.post('/api/v1/todo_items', {
        //   todo_item: {
        //     title: 'a hard coded to do item',
        //     complete: false,
        //     user_id: 1
        //   }
        // })
        // .then( (response) => {
        //   console.log(response);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
    }

    setAxiosHeaders() {
        // https://medium.com/@zayneabraham/ruby-on-rails-csrf-protection-with-react-js-65dd84b8edad
        const csrfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken
      }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="title" required />
                <button>Add To Do Item</button>
            </form>
        )    
    }

}

export default TodoForm