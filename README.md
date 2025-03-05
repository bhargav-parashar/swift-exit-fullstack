# SWIFT EXIT
Swift Exit is a fullstack resignation submission application. Role based access control concept is used. User can login/regiser as an employee and submit a resignation. They can then login as Admin (HR in this case) and then review (approve or reject) the resignation.

## APPLICATION DETAILS 
1. Bundler : VITE.
2. Render : Backend deployment.
3. Vercel : Frontend deployment.
4. MongoDB Atlas : DB hosted in cloud.
5. Special thanks : Babel.

## CORE CONCEPTS 
1. Role based access control.
2. Logged In user persistance by making use of HTTP only, secure, non-same site cookies.
3. JWT Token is used to create a cookie for user in server and this cookie is sent by server which gets set in the client's browser.
4. Password Hashing during registration.
5. Routing through react-router-dom.
6. Backend powererd by NodeJs, Express, Mongoose ODM. 
7. Layered backend server architecture : routes -> middlewares -> controllers -> services -> models -> MongoDB.
8. MongoDB / Mongoose aggregation pipeline : $lookup, $unwind, $project.   
9. MongoDB / Mongoose CRUD operations.
10. CORS. 



