const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// const xlsx = require('xlsx');

const mongoose = require('mongoose');
const db = 'seongnam-love-gift';
const password = process.env.MONGODB_PW;

const MONGODB_URI = `mongodb+srv://user:${password}@cluster0.mbovv.mongodb.net/${db}?retryWrites=true&w=majority`;

const StoreSchema = new mongoose.Schema({
    name: {
        type: String
    },
    item: {
        type: String
    },
    location: {
        type: new mongoose.Schema({
            full: {
                type: String
            },
            dong: {
                type: String
            },
            gu: {
                type: String
            }
        }),
    },
    tel: {
        type: String
    },
    payment: {
        type: String
    }
});

const StoreModel = mongoose.model('Store', StoreSchema);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

app.get('/api/find-store/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    StoreModel.find({
            name: new RegExp(`.*${keyword}.*`)
        }).exec()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.error(err);
        });
});

const fitStoreSchema = data => {
    return data.map(e => {
        return {
            name: e.상호 || null,
            item: e.품목 || null,
            location: {
                full: e.주소 || null,
                dong: e.동 || null,
                gu: e.구 || null
            },
            tel: e.전화번호 || null,
            payment: e.결재방법 || null
        }
    });
};

app.post('/api/renew', (req, res) => {
    // const start = new Date();
    // const obj = {};
    // StoreModel.deleteMany().exec()
    //     .then(storeList => {
    //         const xlsxPath = path.join(__dirname, '../data.xlsx');
    //         const excelFile = xlsx.readFile(xlsxPath)
    //         const sheet = excelFile.Sheets[excelFile.SheetNames[0]];
    //         const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: '' });
    //         obj.removed = storeList.deletedCount;
    //         return StoreModel.insertMany(fitStoreSchema(jsonData));
    //     })
    //     .then(storeList => {
    //         const end = new Date();
    //         obj.elapsedTime = `${(end.getTime() - start.getTime()) / 1000}s`;
    //         obj.added = storeList.length;
    //         res.send(obj);
    //     })
    //     .catch(err => {
    //         console.error(err);
    //     });
    res.send('wrong access');
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
});