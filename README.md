# Rest API Response interface
A shorter way to send NodeJs rest-api response.

```sh
$ npm install rest-api-response --save
```

if `NODE_ENV` is set to 'dev' it will show the message and error body ( for development ).

- ``success`` - is response a success or not
- ``status`` - Response status code.
- ``data`` - response data
- ``error`` - error object
- ``error - errorId`` - contains Automatically Generated ErrorID
- ``error - message`` - Message to the client about the error ( 404,401,500 and 403 will return static message unless in development mode)

---

usage:
To make express async capable and help me along i used this
```
const {APIResponse} = require('rest-api-response');
module.exports = (handler) =>
    async (req, res, next) => {
        try {
            new APIResponse(res).success(
                await handler(req, next)
            )
        } catch (error) {
            next(error);
        }
    };
```
This allows me to simply return the response without any hustle.
example of 404 handler
```
const
    {NotFoundError} = require('./rest-api-apiresponse');
    
router.use('/', asyncify(
    async (req) => {
        throw new NotFoundError("[" + req.method + "] - " + req.path);
    }
));
```
example of async handler with response + header
```
const
    asyncify = require('./helpers/asyncify.js'),
    {Response} = require('./rest-api-apiresponse');
    
router.use('/', asyncify(
    async (req) => {
        const email = await getUserEmail(req.query);
        
        const response = new Response({ userEmail: email });
        response.set('test-header', 'i am header');
        
        return response;
    }
));
```

# Basic DOC
to return success:
```
const
    {APIResponse} = require('./rest-api-apiresponse');

router.get('/test', (req,res)=>{
    new APIResponse(res).success({ ok: true });
});
```
results in:
```
{
    "status":200,
    "data":{
        "ok":true
    },
    "error":null,
    "success":true
}
```
---


to return not found,unauthorized or forbidden:
```
const
    {APIResponse} = require('./rest-api-apiresponse');

router.get('/test', (req,res)=>{
    new APIResponse(res).notFound("Error Message");
    // new APIResponse(res).forbidden("Error Message");
    // new APIResponse(res).unauthorized("Error Message");
    // new APIResponse(res).serverError("Error Message");
});
```
results in
```
{
    status: 404,                                            // status according to the error
    data: null,                                             // Null when error is set
    error: {
        errorId: "47e0be0d-598b-4e48-b05c-f41cb704d02c",
        message: "Not Found",                               // "Not Found" unless in development mode
        body: {}                                            // empty unless in development mode
    },
    success: false
}
```
---

To return validation errors:
```
const
    {APIResponse} = require('./rest-api-apiresponse');

router.get('/test', (req,res)=>{
    new APIResponse(res).invalid("Custom Invalid Message");
});
```
results in
```
{
    status: 400,                                            //400
    data: null,                                             //data is null on validation error
    error: {
        errorId: "c5389ef8-3ac2-42b5-933d-b5df355b342c",    //Error ID
        message: "Custom Invalid Message",                  //Error Message passed from above
        body: {}
    }
},
success: false
}
```
---


To return a custom response:
```
const
    {APIResponse, Response} = require('./rest-api-apiresponse');

router.get('/test', (req,res)=>{
    const response = new Response({ok:true});
    response.set('Test-Header', 'The test worked');
    new APIResponse(res).success(response);
    return response;
});
```

OR 

```
const
    {APIResponse, Response} = require('./rest-api-apiresponse');

router.get('/test', (req,res)=>{
    const response = new Response({ok:true}); 
    response.set('Test-Header', 'The test worked');
    
    new APIResponse(res).success(response); 
});
```
will set the `Test-Header`.

---

To add custom fields to response simply extend the ``Response`` object
```
const
    {APIResponse, Response} = require('./rest-api-apiresponse');

class CustomResponse extends Response{
    constructor(data){
        super(data);
        this.customField="custom"
    }
}
router.get('/test', (req,res)=>{
    const response = new CustomResponse({ok:true});
    new APIResponse(res).success(response);
});
```

will result in:
```
{
    "status":200,
    "data":{
        "ok":true
    },
    "customField":"custom",
    "error":null,
    "success":true
}
```