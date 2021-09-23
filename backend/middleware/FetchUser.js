const jwt = require('jsonwebtoken');
const JWT_SECRET = "thisisinotebookreactapp";

const fetchUser = (req,res,next)=>{
    //get user using jwt
    console.log('user fetched');
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send('access denied');
    }
    try {
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        console.log(data,"Fetch User");
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401).send('access denied');
        
    }

}

module.exports = fetchUser