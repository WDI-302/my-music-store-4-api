const verifyUserIsLoggedIn = (req) => {
  if(!req.user){
    throw new Error('User is not logged in');
  }
  return;
};

const verifyAdminPermission = (req) => {
  // first verify the user is logged in
  verifyUserIsLoggedIn(req);

  // Now Were checking admin permission
  if(!req.user.isAdmin){
    throw new Error('User is not an admin')
  }
  return;
};

const PermissionService = {
  verifyUserIsLoggedIn,
  verifyAdminPermission,
};

module.exports = PermissionService;