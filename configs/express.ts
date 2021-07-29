// load modules
import * as express from 'express';
const cors = require('cors');
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as nochache from 'nocache';
import DBSetup from './db'; 
import { AuthRoutes } from '../routes';
// --- Vulnerability fixes
const helmet = require('helmet');

const allowedMethods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'DELETE', 'PUT'];

class App {
    configureFinalHandlers = () => {
        // application level exception handler
        this.app.use((err, req, res, next) => {
            console.error(err.stack)
            res.status(500).send('Please contact admin or support team!')
        });
    }
    public app: any;

    constructor() {
        this.app = express();
        this.init();
        this.config();
        this.routes();
        this.configureFinalHandlers();
    }

    public listen(port: number, fn: any): void {
        console.log('port..', port);
        this.app.listen(port, fn); // with socket.io and express app
    }

    public close() {
        this.app.close(() => {     // stopping http server
            console.log('Http server closed.');
            process.exit(0);        // stop the server process
        });
    }

    private config(): void {
        // --------- Logger configuration
        this.app.use(morgan('short'));


        // ------- to protect your app from well-known web vulnerabilities by setting 
        //         HTTP headers appropriately.
        this.app.use(helmet());

        this.configHelmet();
        // ------- end of vulnerability

        // --------- request content parser
        // this.app.use(bodyParser.json({ limit: '10mb' }));
        // For Express Validation
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // -------- CORS configuration
        const origins = [
            'http://localhost:4200', 'http://localhost'
        ];
        const corsOptionsDelegate = function (req, callback) {
            var corsOptions;
            if (origins.indexOf(req.headers.origin) !== -1) {
                corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
            } else {
                corsOptions = { origin: false } // disable CORS for this request
            }
            callback(null, corsOptions); // callback expects two parameters: error and options
        }
        this.app.use(cors(corsOptionsDelegate));

        this.app.use(function (req, resp, next) {
            // To allow request methods like OPTIONS, GET,HEAD,POST, DELETE, PUT
            if (!allowedMethods.includes(req.method)) {
                resp.status(403).send('Method Not Allowed');
            }

            resp.setHeader('Access-Control-Allow-Methods',
                'OPTIONS, GET, POST, PUT, DELETE');
            resp.setHeader('Access-Control-Allow-Headers',
                'application/json, X-Requested-With,application/x-www-form-urlencoded, image/png, image/jpg, image/jpeg, Content-Type, Authorization, Origin, Accept, multipart/form-data , application/octet-stream');
            resp.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
            next();
        });

        // -------- to serve static resoc and includes
        this.app.use(express.static('./public'));

    }

    private routes(): void {
        new AuthRoutes(this.app);
    }

    private init(): void {
        DBSetup.init((err) => {
           if (err) {
              console.log('Failed to initialize environment please restart!\nError:' + err.message);
              return;
           }
           console.log('App ready!');
        });
     }

    /** 
    * Handling vulnerability tweaks using helmet
   */
   public configHelmet() {
    //-- to enable Content Security Policy
    this.app.use(
       helmet.contentSecurityPolicy({
          directives: {
             defaultSrc: ["'self'", 'https:', 'wss:'],
             scriptSrc: [
                "'self'", "'unsafe-inline'", 'https:', 'wss:'
             ],
             styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'wss:'],
             imgSrc: ["'self'", 'data:', 'https:'],
             fontSrc: ["'self'", 'data:'],
             objectSrc: ["'none'"],
             mediaSrc: ["'self'"],
             frameSrc: [
                "'self'", 'https:',
             ],
             frameAncestors: ["'none'"],
             childSrc: [
                "'self'",
             ],
             connectSrc: [
                "'self'", 'https', 'wss:'
             ]

          }
       }));

    //-- to disable browser caching
    this.app.use(nochache());

    //-- set by web browsers to tell a server where it’s coming from
    this.app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

    //-- to enable Web Browser XSS Protection
    this.app.use(helmet.xssFilter());

    //-- Frameguard mitigates clickjacking attacks by setting the X-Frame-Options header
    this.app.use(helmet.frameguard({ action: 'deny' }));

    //-- to allow Strict-Transport-Security over https
    this.app.use(helmet.hsts({ includeSubDomains: true, maxAge: 31536000, preload: true }));

    this.app.use(helmet.expectCt({ enforce: true, maxAge: 7776000, reportUri: 'https://ctl.digicet-ct.com' }));

    //-- to prevents Adobe Flash and Adobe Acrobat from loading content
    this.app.use(helmet.permittedCrossDomainPolicies());

    // -- to remove the X-Powered-By header to make it slightly harder for attackers
    // this.app.use(helmet.hidePoweredBy({ setTo: 'private' }))

    // to avoid revealing Tech stack through header
    this.app.disable('x-powered-by');
 }
}
const app = new App();

export default app;