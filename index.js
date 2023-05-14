const http = require('http');
const fs = require('fs');
const data1 = JSON.parse(fs.readFileSync('data.json','utf-8'));
const data = fs.readFileSync('index.html','utf-8');
const products = data1.products;



const server = http.createServer((req,res)=>{
    console.log(req.url)
    console.log('Server Running on 8080')

    if(req.url.startsWith('/product')){
        const id = req.url.split('/')[2]
        const product = products.find(p=>p.id===(+id))
        console.log(product)
        res.setHeader('Content-Type','text/html')
        let modifiedData = data.replace('**title**', product.title)
            .replace('**url**', product.thumbnail)
            .replace('**price**', product.price)
            .replace('**rating**', product.rating);
            res.end(modifiedData);
            return;
    }
    switch(req.url){
        case '/':
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
            break;
        case '/api':
            res.setHeader('Content-Type','application/json');
            res.end(JSON.stringify(data1));
            break
        default:
            res.writeHead(404);
            res.end();
    }
    
    
})
server.listen(8080);