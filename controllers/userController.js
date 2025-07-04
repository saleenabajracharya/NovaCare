const {getUsers,getSingleUsers,updateUser, removeUser, removeUsers} = require('../models/userModel');

const getUserData = async (req, res) =>{
    try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const getSingleUserData = async(req,res)=>{
try{
    const UserId = req.params.UserId;
    if (!UserId) {
      return res.status(400).json({ message: 'Error occured' });
    }
    const user = await getSingleUsers(UserId);
    if(!user){
        return res.status(404).json({message:'User not found'});
    }
    res.status(200).json(user); 
} catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

const updateUserData = async (req, res) => {
  const UserId = req.params.UserId;
  if (isNaN(UserId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  const { fullname, phone, email, role, department, modifiedBy } = req.body;

  try {
    const existingUser = await getSingleUsers(UserId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await updateUser(
      UserId,
      fullname ?? existingUser.fullname,
      phone ?? existingUser.phone,
      email ?? existingUser.email,
      role ?? existingUser.role,
      department ?? existingUser.department,
      modifiedBy ?? existingUser.modified_User
    );

    res.status(200).json({ message: "User record updated successfully" });
  } catch (error) {
    console.error("Error updating user record:", error);
    res.status(500).json({ message: "Failed to update user record" });
  }
};

const removeUserData = async (req, res) => {
  const UserId = req.params.UserId;
  if (isNaN(UserId)) {
    return res.status(400).json({ message: "Invalid User ID" });

  } 
  try{
    await removeUser(UserId);
    res.status(200).json({ message: "User removed successfully" }); }
    catch (error) {
    console.error("Error removing user record:", error);
    res.status(500).json({ message: "Failed to remove user record" });
  }
      
}

const removeAllUserData = async (req, res) => {

  try{
    await removeUsers();
    res.status(200).json({ message: "Users removed successfully" }); }
    catch (error) {
    console.error("Error removing users record:", error);
    res.status(500).json({ message: "Failed to remove users record" });
  }
      
}
module.exports = {
getUserData, getSingleUserData, updateUserData, removeUserData, removeAllUserData
}