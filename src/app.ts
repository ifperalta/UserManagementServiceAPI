import { Request,  Response } from 'express';
import { app, express, port, bodyparser, cors} from './config';
import user_routes from "./UserServices/UserRoutes";



app.use(cors());
app.use(bodyparser.json());  
app.use(bodyparser.urlencoded({extended: true}));
app.use( (req: any, res: any, next: any) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  

app.get("/", (req: Request, res: Response) => {
    res.json({
        "status" : 200,
            "data" : {
                response: "working"
            }
    });
});

// Users Rest API
app.use(express.json());
app.use("/user/", user_routes);

app.listen(port, () => console.log('Listening to port ${port} ...'));