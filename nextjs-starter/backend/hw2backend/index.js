
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app, Datastore} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import {date, object, string, number, bool} from 'yup';
import jwtDecode from 'jwt-decode';

const TaskYup = object({
  task: string().required(),
  userId: string().required(),
  done: bool().required(),
  createdOn: date().default(() => new Date())
});

// authorization from in-class example
const userAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const token = authorization.replace('Bearer ','');
      // NOTE this doesn't validate, but we don't need it to. codehooks is doing that for us.
      const token_parsed = jwtDecode(token);
      req.user_token = token_parsed;
    }
    next();
  } catch (error) {
    next(error);
  } 
}
app.use(userAuth)


// Use Crudlify to create a REST API for any collection
crudlify(app, {todos: TaskYup})

// bind to serverless runtime
export default app.init();
