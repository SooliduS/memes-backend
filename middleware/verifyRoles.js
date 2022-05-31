const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const roles = [...allowedRoles];
    const verified = req.roles.map((role)=>roles.includes(role)).find((val)=>val===true)
    if (!verified) return res.sendStatus(401);
    next();
  };
};


module.exports = verifyRoles;
