const express = require("express");
const {users} = require("../Data/users.json");

const router = express.Router();


/**
 * Route: /users
 * Method: GET
 * Description: Get All Users
 * Access: Public
 * Parameters: None
 */

router.get("/", (req, res)=>{
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

router.get("/:id", (req, res)=>{
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

router.post("/", (req, res)=>{
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

router.put('/:id', (req, res)=>
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

router.delete('/:id', (req, res)=>{
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

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description:Get all subscription details
 * Access: Public
 * Parameters: Id
 */

router.get("/subscription-details/:id", (req, res)=>{
     const {id} = params;

     const user = users.find((each)=> each.id = id);

     if(!user)
        return res.status(404).json({
         success: false,
         message: "User Not Found :-( "
        })
        const getDateInDays = (data = "") => {
            let date;
            if(data === ""){
                //current date
                date = new Date();
            }else{
                // getting date on basis of data variable
                date = new Date(data)
            }
            let days = Math.floor(data / (1000 * 60 * 60 * 24));
        };

        const subscriptionType = (date) => {
            if (user.subscriptionType === "Basic"){
                date = data + 90;
            }else if (user.subscriptionType === "Standard"){
                date = data + 180;
            }else if (user.subscriptionType === "Premium"){
                date = data + 365;
            }
            return date; 
        };
        // Subscription Calculation Expiration Logic
        // Jan 1, 1970, utc // milli seconds

        let returnDate = getDateInDays(user.returnDate);
        let currentDate = getDateInDays();
        let subscriptionDate = getDateInDays(user.subscriptionDate);
        let subscriptionExpiration = subscriptionType(subscriptionDate);

        const data = {
            ...user,
            subscriptionExpired: subscriptionExpiration < currentDate,
            daysLeftForExpiration: subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate,
            fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
        }
        return res.status(200).json({
            success: true,
            data: data
        })
       
})

module.exports = router;