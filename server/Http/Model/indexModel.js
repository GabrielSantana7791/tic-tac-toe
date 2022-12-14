import { tttServer } from "../../js.js";
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, "..", "..", "..", "/public");

export default function run() {
    tttServer.getApp().get('/', (req, res) => {
        res.sendFile(dir + '/index.html');
    })

    tttServer.getApp().use(express.static(dir))
}