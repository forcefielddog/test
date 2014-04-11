
steal('can/construct', function (Construct) {
    
    var Todo = can.Construct(
        {
            init : function () {},
            author : function () {},
            coordinates : function () {},
            allowedToEdit : function (account) {
                return true;
            }
        }
    
    );
                              
    var PrivateTodo = Todo(
        {
            allowedToEdit: function (account) {
                return account.owns(this);
            }
        }
    
    );

});

steal('can',
      'can/util/fixture',
      './todos.ejs',
 
      function(Can, TodoEJS){
      
          Todo = 
              can.Model({
                findAll : "GET /todos",
                findOne : "GET /todos/{id}",
                create  : "POST /todos",
                update  : "PUT /todos/{id}",
                destroy : "DELETE /todos/{id}"
            },{});
          
          
            var TODOS = [
                {id: 1, name: "wake up"},
                {id: 2, name: "take out trash"},
                {id: 3, name: "do dishes"}
            ];

          can.fixture({

            "GET /todos": function(){
                return TODOS;
            },

            "GET /todos/{id}": function(orig){
                return TODOS[(+orig.data.id)-1];
            },

            "POST /todos": function(request){
                TODOS.push(request.data);
                return {id: TODOS.length};
            },

            "PUT /todos/{id}": function(){

                return {};
            },

            "DELETE /todos/{id}": function(id){
                return {};
            }

          });

        Todo.findAll({}, function(todos){
            console.log(todos);
        });

        Todo.findOne({}, function(todo){
            console.log(todo);
        });
        
        var todo = new Todo({name: "mow lawn"});
        todo.save(function(todo){
            console.log("created ", todo);
           
        });

          
        Todo.findAll({}, function(todos){
            console.log('got todos:', todos);
        });
          
          
          todo.destroy(todo.id);
          
          Todo.findAll({}, function(todos){
            console.log('got newest todos:', todos);
        });
          
          
          var todo1 = new Todo({name: "get paid"});
          todo1.bind('created', function(ev, todo){
              console.log("created", todo);
          });
          todo1.save();
          
          
          Todo.findAll({}, function(todos){
            console.log(can.view("todosEJS", todos));
              $('#todos').html(todosEJS(todos));
        });
          
          
      
          
      }



);

