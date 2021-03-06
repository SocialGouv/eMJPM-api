const express = require("express");
const cors = require("cors");
//const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const routes = require("./routes/index");
const users = require("./routes/users");
const authRoutes = require("./routes/auth");
const inscriptionRoutes = require("./routes/inscription");
const Knex = require("knex");
const KnexSessionStore = require("connect-session-knex")(session);
const Sentry = require("@sentry/node");

const app = express();

Sentry.init({
  dsn:
    process.env.SENTRY_PUBLIC_DSN ||
    "https://d9ba9b75ff784cba87abd847b6162b02@sentry.num.social.gouv.fr/3"
});

process.on("unhandledRejection", r => {
  // not sure this is ever reached
  Sentry.captureException(r);
  console.log("unhandledRejection", r);
});

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "\xa9\x93v\x8b\x0cJ\xc1\x94l\x83MY\xa4\xb1\xb2\xb1\xe5\x0e\x98m\x9ee\x1a\x16";

const corsOptions = {
  credentials: true,
  origin: true
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use persistents sessions in production
if (process.env.NODE_ENV === "production") {
  console.log("process.env.DATABASE_URL", process.env.DATABASE_URL);
  const knex = Knex({
    client: "pg",
    connection: process.env.DATABASE_URL
  });

  const store = new KnexSessionStore({
    knex
  });

  app.use(
    session({
      secret: SECRET_KEY,
      cookie: {
        maxAge: 1000 * 60 * 60 * 4 // 4 hours
      },
      store: store
    })
  );
} else {
  app.use(
    session({
      secret: SECRET_KEY,
      resave: false,
      saveUninitialized: true
    })
  );
}

app.use(passport.initialize());
app.use(passport.session());
app.use("/api/v1/inscription", inscriptionRoutes);
app.use("/api/v1", passport.authenticate("jwt", { session: false }), routes);
app.use("/auth", authRoutes);
app.use("/doc", require("./routes/doc"));
app.use("/", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error(`404 Not Found : ${req.url}`);
  err.status = 404;
  Sentry.captureException(err);
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
/*
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: err
    });
  });
}*/

// production error handler
// no stacktraces leaked to user
if (process.env.NODE_ENV !== "test") {
  app.use(function(err, req, res, next) {
    Sentry.captureException(err);
    res.status(err.status || 500).json({
      error: {}
    });
  });
}

const port = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(port, "0.0.0.0", () => {
    console.log(
      `Listening on http://127.0.0.1:${port} [${process.env.NODE_ENV ||
        "development"}]`
    );
  });
}

module.exports = app;
