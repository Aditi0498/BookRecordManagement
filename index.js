const express = require("express");
const {users} = require("./Data/users.json")
const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Server is up and running"
    })
})



/**
 * Route: /users
 * Method: GET
 * Description: Get All Users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res)=>{
    res.status(200).json({
        success: true,
        Data: users
    })
    
})


/**
 * Route: /users/:id
 * Method: GET
 * Description: Get All Users
 * Access: Public
 * Parameters: None
 */

app.get("/users/:id", (req, res)=>{
   const {id} = req.params;
   const user = users.find((each)=> each.id === id);
    
    if (!user){
        return res.status(404).json({
            success: false,
            message: "User Not Found :-("
        })
    }
    return res.status(200).json({
        success: true,
        Data: user 
    })
    
})

/**
 * Route: /users
 * Method: POST
 * Description: Create a New User
 * Access: Public
 * Parameters: None
 */

app.post("/users", (req, res)=>{
   const {id, name, surname, email, subscriptionType,subscriptionDate } = req.body;

   const user = users.find((each)=> each.id === id);

   if(user){
    return res.status(404).json({
        success: false,
        message:"User with the given id exists :-("
    })
   }
   users.push({
    id, name, surname, email, subscriptionType,subscriptionDate 
   })
   return res.status(201).json({
    success: true,
    Data: users
   })
})

/**
 * Route: /users/:id
 * Method: Put
 * Description: Updating a user by their ID
 * Access: Public
 * Parameters: id
 */

app.put('/users/:id', (req, res)=>
{
    const {id} = req.params;
    const{data} = req.body;

    const user = users.find((each)=> each.id === id);

    if(!user)
        return res.status(404).json ({
        success: false,
        message: "User with given id doesn't exist :-("
    })
    const updatedUser = users.map((each)=>{
        if(each.id === id){
            return{...each,
                ...data
            }
        }
        return each;
    })
    return res.status(200).json({
        success: true,
        data: updatedUser
    })
})


/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Delete a user by their ID
 * Access: Public
 * Parameters: id
 */

app.delete('/users/:id', (req, res)=>{
    const{id} = req.params;

    const user = users.find((each)=> each.id === id);

    if(!user)
        return res.status(404).json({
    success:false,
    message: "User with given id doesn't exist :-(("
    })
    const index = users.indexOf(user);
    users.splice(index, 1);

    return res.status(200).json({
        success: true,
        data: users
    })
})


app.get("*", (req, res)=>{
    res.status(200).json({
        message: "this route does not exist"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is up and running on port ${PORT}`);
})