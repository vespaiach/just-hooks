const Koa = require('koa');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const _ = require('lodash');
const Router = require('@koa/router');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

router.get('/ok', ctx => {
  ctx.status = 200;
  ctx.body = { status: 'ok' };
});

router.get('/400', ctx => {
  ctx.status = 400;
  ctx.body = { name: 'something wrong with name field' };
});

router.get('/401', ctx => {
  ctx.status = 401;
});

router.get('/500', ctx => {
  ctx.status = 500;
});

router.get('/unexpected', ctx => {
  throw new Error('Unexpected');
});

/**
 * Expect browser alert cors request
 */
router.delete('/cors', ctx => {
  ctx.status = 200;
});

//Koa config
app.use(
  cors({
    maxAge: 0,
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST',
    headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  })
);
app.use(serve('..'));
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

app.listen(8081);
console.log('Server started on port %s', 8081);
