import {Link} from "react-router-dom"
import styles from './ProductList.module.css'
import {useState, useEffect} from "react"  //React Hook
import Title from "./Title"
import QuantityBtn from "./QuantityBtn"

export default function ProductList() {

    let [productList, setProductList] = useState([])
    let [input , setInput] = useState('')

    //useEffect
    useEffect(()=>{
        //1 : 無第二個參數 : component每次render都會觸發
        //2 : Dependency Array是空array時 : 只會在第一次網頁render時會觸發
        //3 : Dependency Array是有變數時 : 第一次網頁render時 + 指定的變數改變 會觸發
        fetch('https://hoyinleung.github.io/demoapi/react-basic-product.json')
            .then(response => response.json())
            .then(data => setProductList(data))
            
        console.log(productList)
    },[]) // <==  Dependency Array

    useEffect(()=>{
        if(input.length>4)
            console.log('字串夠長')
        else
            console.log('字串太短')
    },[input])

    return (
        <div>
            <input type="text" onChange={e=>setInput(e.target.value)} />
            <Title mainTitle="請選擇要購買的水果" />
            
            <div>
                {
                    productList.map(product=>(
                        <div className={styles.productBorder} key={product.id}>
                            {product.name}<br/>
                            {product.price}<br/>
                            <Link to={'/product/'+product.id}>
                            <img src={process.env.PUBLIC_URL+'/img/'+product.image} alt={product.name} />
                            </Link>
                            <br/>
                            {product.description}<br/>
                            <QuantityBtn/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
