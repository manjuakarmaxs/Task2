const express=require('express');
const con = require('./connection');
const app=express();
app.use(express.json())
const port=3000;

app.use(express.json())


app.get('/viewBookData',(req,res)=>{
    con.query('SELECT * FROM CATALOG',(err,rows)=>{
        if(err){
            res.status(500).json({error:'Internal server error'})
        }
        else{
            res.status(200).json(rows)
        }
    })
})

app.post('/insertBook', (req, res) => {
    var book = req.body;
    var book_Data = [book.BID,book.BNAME, book.BAUTHOR]
    con.query('INSERT INTO CATALOG(BID,BNAME,BAUTHOR) values(?)', [book_Data], (err, rows) => {
        if (err) {
            res.status(400).json(err)
        } else {
            return res.status(200).json({ message: 'book  inserted successfully' });
        }
    })
})

app.post('/updateBook',(req,res)=>{
    var BID=req.body.BID;
    var UpdateData=req.body;
    con.query('UPDATE CATALOG SET ? where BID='+UpdateData.BID,[UpdateData],(err,rows)=>{
        if(!BID){
            res.status(400).json(err)
        }else{
            return res.status(200).json({ message: 'book  updated successfully' });
        }
    });
})


app.delete('/deleteData',(req,res)=>{
    var DeleteData=req.body.BID;
    if(!DeleteData){
        return res.status(400).json({ error: 'Invalid ID. BID is required.' })
    }
        con.query('DELETE FROM CATALOG WHERE BID = ?', [DeleteData], (err, result) => {
        if (err){
            return res.status(500).json({ error: 'Database error: ' + err.message });
        }
        if (result.affectedRows > 0) {
                        return res.status(200).json({ message: 'BOOK  deleted successfully' });
                    } else {
                        return res.status(404).json({ message: 'BOOK ID not found' });
                    }
             
    });
}) 


app.listen(port,()=>{
    console.log(`server is running ${port}`)
})



