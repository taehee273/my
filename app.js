const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8001;

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/submit', async (req, res) => {
    const selectedNumber = req.body.selectedNumber;
    console.log('사용자가 선택한 이미지 번호:', selectedNumber);

    const filePath = path.join(__dirname, 'data.txt');

    try {
        await fs.promises.appendFile(filePath, `사용자가 선택한 이미지 번호: ${selectedNumber}\n`);
        console.log('데이터가 파일에 저장되었습니다.');
        res.json({ message: '데이터를 성공적으로 받았습니다!' });
    } catch (err) {
        console.error('데이터 저장 중 오류 발생:', err);
        res.status(500).json({ message: '데이터 저장 중 오류가 발생했습니다.' });
    }
});

app.get('/api/data', async (req, res) => {
    const filePath = path.join(__dirname, 'data.txt');

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        res.json({ data: data });
    } catch (err) {
        console.error('파일 읽기 중 오류 발생:', err);
        res.status(500).json({ message: '데이터를 불러오는 중 오류가 발생했습니다.' });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`HTTP 서버가 http://localhost:${port}에서 작동 중입니다`);
});
