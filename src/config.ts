export const express = require("express");
export const app = express();
export const md = require('md5');
export const bodyparser = require('body-parser');
export const cors = require("cors");

// Rest API port
export const port = process.env.PORT || 8001;

