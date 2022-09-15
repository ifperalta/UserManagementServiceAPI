import { Router  } from 'express';
import { getAllPremiums,
         getAllFree, 
         getUserByID, 
         addNewUser, 
         updateUser,
         deleteUser,
         getAllUsers
        } from "./UsersControllers";

import { authenticate, 
        userauth, 
        signout, 
        userdata } from "./UserAuthenticate";

const router = Router();

// experiment
router.route("/all").get(getAllUsers);
// if this is moved below it will now work


router.route("/signout/:token").put(signout); // remove user login token
router.route("/auth").put(authenticate); // authenticate user credentials
router.route("/auth/:token").get(userauth);  // check the user if logged in
router.route("/userdata/:token").get(userdata); // get user information after login

// other user services
router.route("/all/premium").get(getAllPremiums);
router.route("/all/free").get(getAllFree);
router.route("/:user_id").get(getUserByID);
router.route("/add").post(addNewUser);
router.route("/update/").put(updateUser);
router.route("/delete/:user_id").delete(deleteUser);

export default router;