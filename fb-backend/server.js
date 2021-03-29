
import path from 'path'
const __dirname = path.resolve();
import dotenv from 'dotenv';
dotenv.config({path :path.join(__dirname, '../config.env') });
// import MONGO from "./config.js"
import {MONGO_URI } from "./config.js"
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import GridFsStorage from 'multer-gridfs-storage'
import Grid from 'gridfs-stream'
import bodyParser from 'body-parser'
import Pusher from 'pusher'
import mongoPosts from './mongoPosts.js'


Grid.mongo = mongoose.mongo  // to store images

// const {MONGO_URI } = MONGO
// app config 
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1163566",
    key: "ebb185556f4b170b143d",
    secret: "795d0a28fc0a14d0a75e",
    cluster: "ap2",
    useTLS: true,
  });

// middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

// if(NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, '/facebook-clone/build')))
//     app.get('*' , (req,res) => {
//         res.sendFile(path.join(__dirname, 'client' , 'build', 'index.html'))
//     })
// } else {
//     app.get('/', (req,res) => {
//         res.send("Api running")
//     })
// }

// db config 

const conn = mongoose.createConnection(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // first connection is for grid fs storage

mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once('open', () => {
    console.log('Connected Db');

    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change) => {
        console.log(change);

        if(change.operationType === 'insert'){
            console.log("trigering pusher");

            // posts is channel name
            pusher.trigger('posts', 'inserted', {
                change: change
            })
        } else{
            console.log("Error Triggering Pusher ");
        }
    })
})

let gfs

conn.once('open', () => {
    console.log("db connected");

    gfs = Grid(conn.db, mongoose.mongo) // setting target pof grid fs
    gfs.collection('images')

})

const storage = new GridFsStorage({
    url: MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            {
                const filename = `image-${Date.now()}${path.extname(file.originalname)}`  // define file name

                const fileInfo = {
                    filename: filename,
                    bucketName: 'images'

                }
                resolve(fileInfo)
            }
        })
    }
})
const upload = multer({ storage })



// api routes
app.get('/', (req, res) => res.status(200).send('hello world'))

//to upload file
app.post('/upload/image', upload.single('file'), (req, res) => {
    res.status(201).send(req.file)
})

// to upload post
app.post('/upload/post', (req, res) => {
    const dbPost = req.body

    // mongoPosts is a schema
    mongoPosts.create(dbPost, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

// To retrive file or image that we save in momgodb
app.get('/retrieve/image/single', (req, res) => {
    gfs.files.findOne({ filename: req.query.name }, (err, file) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (!file || file.length === 0) {
                res.status(404).json({ err: 'file not found' })
            } else {
                // passing which file we do wanna find
                const readstream = gfs.createReadStream(file.filename);
                // to pass file 
                readstream.pipe(res)
            }
        }
    })
})

//To retrieve post
app.get('/retrieve/posts' , (req,res) => {
    mongoPosts.find((err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            //sorting everything inside of data base
            data.sort((b , a) =>{
                return a.timestamp - b.timestamp;
            });

            res.status(200).send(data)
        }
    })
})
// listen
app.listen(port, () => console.log(`listening to port:${port}`))