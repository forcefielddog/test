
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
 
      function(Can){
      
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

            "DELETE /todos/{id}": function(){
                return {};
            }

          });

        Todo.findAll({}, function(todos){
            console.log(todos);
        });

        Todo.findOne({}, function(todo){
            console.log(todo);
        });

        var todo = new Todo({
            name: "mow lawn"
        });

        todo.save(function(todo){
            console.log(todo);
        });

        var todo = new Todo({name: "mow lawn"});
        todo.save(function(todo){
            console.log("created ", todo);
            todo.attr("name", "mow my lawn");
            todo.save( function(todo){
                console.log("updated", todo);
            } );
        });
          
          
      }


);